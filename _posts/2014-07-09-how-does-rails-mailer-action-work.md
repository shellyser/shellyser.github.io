---
layout: post
tagline: "ActionMailer Under the Hood"
tags : [rails, ruby]
---

This week we started working on group projects and we’ve been exploring different gems throughout the process. All the work we’ve been doing in lab is now magically reduced to a few lines of code which is well, magical, but makes me feel a little fearful of that extra level of abstraction. We’ve set up our authentication process with the devise gem which among many other things includes modules that can be used to send users notification emails for signing in, to retrieve password and other user authentication related things. Very helpful but since I haven’t yet integrated mailing into any other apps I’ve worked on, I thought I would take a closer look at how it works.

In rails, mails inherit from the ActionMailer module and is actually fairly easy to set up. The mails generator will create a mailer, very similar to the controller, a directory for views and a test.  

{% highlight bash %}
shellyser ♥ bin/rails generate mailer UserMailer
{% endhighlight %}

In the UserMailer class we’ll setup the mailer methods we want to use. The default is a hash that will be set in every mailer method, here we are setting the from field that will appear on the actual email as my flatiron school account. The signup_confirmation method will be responsible of sending the email using the MailerAction mail method. Since the signup_confirmation method isn’t receiving any values through params like our controller actions do we need to set it to receive an argument of user and we set this to an instance of user so we can use it in our view template. 

{% highlight ruby linenos %}
class UserMailer < ActionMailer::Base
  default from: "shelly.seroussi@flatironschool.com"
 
  def signup_confirmation(user)
      @user = user    #will let us access the instance variable in the views
      @url  = 'http://myuglyblog.com/login'
      mail(to: @user.email, subject: 'Welcome to My Ugly Blog Site')
  end
end
{% endhighlight %}

In our views user_mailer folder we’ll create a file that will be rendered as the body of the email. I made two files one in html and the other in text since not all clients prefer HTML. The mail method will know how to generate an email using either of these templates. 

{% highlight html linenos %}
<h1>Hi <%= @user.name %>!</h1>
<p> You have successfully signed up to myuglyblog.com<br></p>
<p> To login to the site, just follow this link: <%= @url %>.</p>
<p>Thanks for joining and have a great day!</p>
{% endhighlight %}

Now, we just need to call the UserMailer class in our Users controller create action. 

{% highlight ruby linenos %}
def create
    @user = User.new(user_params)
    if @user.save
      UserMailer.signup_confirmation(@user).deliver
      session[:user_id] = @user.id
      redirect_to root_path, :notice => "Thank you for signing up!"
    else
      render :new
    end
  end
{% endhighlight %}

Last thing, we need to configure out development environment in order to set raise sending errors to true and any other mailing delivery configurations we would like to do. 

{% highlight ruby linenos %}
# Don't care if the mailer can't send
  config.action_mailer.raise_delivery_errors = true
 
  # Change mail delvery to either :smtp, :sendmail, :file, :test
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    address: "smtp.gmail.com",
    port: 587,
    domain: "localhost",
    authentication: "plain",
    enable_starttls_auto: true,
    user_name: "shellyser",
    password: "shelly2506",
    enable_starttls_auto: true
  }
 
  # Specify what domain to use for mailer URLs
  config.action_mailer.default_url_options = {host: "localhost:3000"}
{% endhighlight %}

This is just a basic overview of the mailer module, there are many additional features that can be added to the mailer such as attachments, multiple recipients, and more. Check out these resources for more information:

[http://railscasts.com/episodes/61-sending-email-revised](http://railscasts.com/episodes/61-sending-email-revised)

[http://guides.rubyonrails.org/action_mailer_basics.html](http://guides.rubyonrails.org/action_mailer_basics.html)