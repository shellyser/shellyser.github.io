---
layout: post
tagline: "Troubleshooting My First App Deployment"
tags : [prework, heroku, rails]
---
{% include JB/setup %}

I'm working today on building the first Rails app on Michael Hartl's tutorial [http://ruby.railstutorial.org/ruby-on-rails-tutorial-book](http://ruby.railstutorial.org/ruby-on-rails-tutorial-book). I'm using Rails 3.2.17 to be able to follow the tutorial and ran into some issues when I tried deploying to Heroku.

<!--more-->

#### Issue 1 

DEPRECATION WARNING: You have Rails 2.3-style plugins in vendor/plugins! Support for these plugins will be removed in Rails 4.0. Move them out and bundle them in your Gemfile, or fold them in to your app as lib/myplugin/* and config/initializers/myplugin.rb. See the release notes for more on this: http://weblog.rubyonrails.org/2012/01/04/rails-3-2-0-rc2-has-been-released. (called from at /app/Rakefile:7)

I found the solution [http://stackoverflow.com/questions/9027403/rails-2-3-style-plugins-and-deprecation-warnings-running-task-in-heroku](here). I needed to add the rails_12factor gem into my Gemfile in order to prevent Heroku from injecting plugins into my app. 

#### Issue 2

rake aborted!
       PGError: could not connect to server: Connection refused
       Is the server running on host "127.0.0.1" and accepting
       TCP/IP connections on port 5432?

The newer Rails versions have a new feature that prevent Rails from working when trying to precompile assets[http://simonecarletti.com/blog/2012/02/heroku-and-rails-3-2-assetprecompile-error/]. Heroku therefore will fail to set database configurations since it first tries to precompile assets causing Rails to try to connect to an unexisting database.  To fix this I had to insert  the following code into the application.rb file. 

config.assets.initialize_on_precompile = false
 