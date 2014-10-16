---
layout: post
tagline: "Movie Gallery Madness"
tags : [rails, ruby, api, json]
---

I worked this week on a little rails app that uses the NYTimes movie api to grab a json with all the information of the latest critically acclaimed movies and create an image gallery of them. I built it pretty quickly and knew I had some major refactoring to do, great opportunity to learn some new tricks!

{% highlight ruby %}
require 'httparty'
 
class Movie
  @@count = 0
 
 def parse
    url = "http://api.nytimes.com/svc/movies/v2/reviews/picks.json?order=by-opening-date&offset=#{@@count}&api-key=663105187ebb5f59f48078d8dd987e3a%3A1%3A54713096"
    @json = JSON.parse(HTTParty.get(url).body)["results"]
  end
 
  def next
    @@count += 20
  end
 
  def prev
    @@count != 0 ? @@count -= 20 : @@count
  end
end
{% endhighlight %}

{% highlight ruby %}
class MoviesController < ApplicationController
    def index
     @movies = Movie.new
     @parsedmovies = @movies.parse
    end
 
    def update_next
      @movies = Movie.new
      @movies.next
      @parsedmovies = @movies.parse
      redirect_to '/'
    end
 
    def update_previous
      @movies = Movie.new
      @movies.prev
      @parsedmovies = @movies.parse
      redirect_to '/'
    end
end
{% endhighlight %}
{% highlight erb %}
***
<div class="prev_next">
   <%= link_to "<button>Previous</button>".html_safe,  :controller => :movies, :action => :update_previous %>
   <%= link_to "<button>Next</button>".html_safe, :controller => :movies, :action => :update_next %>
</div>
***
{% endhighlight %}
After getting my app to simply work there were several things I knew I desperately needed to fix.

####"Button_to" Tag

The button_to tag wasn’t working for me and I had to default to creating a link_to tag and attaching to it the button HTML tags which looked pretty terrible. The problem was that the button_to tag defaults to a POST method as it’s usually used to submit and change data rather than just requesting data. I found the problem in my routes file:

{% highlight ruby %}
get 'movies/index'
get 'movies/update_next'
get 'movies/update_previous'
{% endhighlight %}
The route was configured as a GET method which made the button_tag break since it was defaulting to the POST method. All I had to do is to change my routes to the POST method and the button_tag was finally working.

####Making My App RESTful using Params

Every call to the API only gave me 20 movies at a time and in order to get the next or previous twenty I needed to change the offset on the URI path. The class variable @@count keeps track of the movie count and the prev and next methods in my Movie class updated the count accordingly. I wanted my app to be RESTful and follow the CRUD conventions so having to separate methods in the controller for updating the count didn’t make sense. I needed to be able to pass the value of “next” or “previous” to my controller so I could use only one update method. Hm… Oh yes, params!

I made a key value pair which I would use as my params, key being “page” and the value would be either “next” or “prev”. I also updated the path to the cleaner rails form and passed in the appropriate params. Now, in my controller I could easily use only the update method and according to the param value received call on the prev or next method to update my @@count variable.

{% highlight erb %}
  <div class="prev_next">
    <%= button_to "Previous",  movies_update_path(page: :prev) %>
    <%= button_to "Next", movies_update_path(page: :next) %>
  </div>
{% endhighlight %}

{% highlight ruby %}
  def update
    @movies = Movie.new
    params[:page] == "next" ? @movies.next : @movies.prev
    @parsedmovies = @movies.parse
    redirect_to '/'
end
{% endhighlight %}
####Dynamic Method Call Using “send”

The controller looks so much better but with a great suggestion from Ken Lu I found a great opportunity to use one of the methods I have been reading about in Ruby metaprogramming basics. Since my methods had the exact same names as my param values, I could use the send method to dynamically call a method depending on the value of the request. Send is a Ruby built in method for instances of the Object class which accepts a symbol and multiple arguments. The symbol will invoke the method with a matching name within the instance method of the class and will pass in any arguments that follow the symbol. If I was to add more methods to my Movie class that I wanted to use in my controller I wouldn’t have to change anything other than passing new params with values matching the class methods. I thought this was pretty neat!

So here is how my controller looks like now: 

{% highlight ruby %}
class MoviesController < ApplicationController
    def index
     @movies = Movie.new
     @parsedmovies = @movies.parse
    end
 
    def update
      @movies = Movie.new
      @movies.send(params[:page])
      @parsedmovies = @movies.parse
      redirect_to '/'
    end
end
{% endhighlight %}