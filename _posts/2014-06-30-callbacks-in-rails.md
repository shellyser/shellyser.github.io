---
layout: post
tagline: "Callback Methods in Rails"
tags : [rails, callbacks, ruby]
---

Callback’s are triggered at a certain point of an object’s life cycle, depending on how they’re set to run. I’ve found them very useful in cleaning up my controllers from repetitive coding but after doing some reading I found out that they are actually much more useful than doing just that. They can also be set as conditionals or defined through model relationships. Here’s the the full list of Active Record callbacks taken from the guides: 

####Creating an Object

before_validation
after_validation
before_save
around_save
before_create
around_create
after_create
after_save

####Updating an Object

before_validation
after_validation
before_save
around_save
before_update
around_update
after_update
after_save

####Destroying an Object

before_destroy
around_destroy
after_destroy

In order to use a callback, the method it calls upon needs to be defined, usually within a private method in order to keep the principle of object encapsulation. The method will then be executed at the time requested with the callback on the specified actions:

{% highlight ruby linenos %}
class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit]
  
  def show
  end
  
  def edit
  end
  
 private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end
  end
{% endhighlight %}
As useful and commonly used as they are, callbacks need to be used with caution. A common example I have seen them used for is in user models were an email confirmation needs to be sent out to the user notifying him that a certain action has been made. This sort of callback can cause complications when testing as the multiple sending of emails slows down the tests significantly. Also, we are making a request that happens after the user object has been created and might not be within its area of responsibility. In this case, it’s better to get rid of the callback and use a separate class that’s single responsibility is to hold the methods that will sent out those email notifications. Here’s and example taken from Samuel Mullen’s blog:

{% highlight ruby linenos  %}
class OrderCompletion
  attr_accessor :order
 
  def initialize(order)
    @order = order
  end
 
  def create
    if self.order.save
      self.purchase_completion_notification
    end
  end
 
  def purchase_completion_notification
    Notifier.purchase_notifier.deliver(self.order)
  end
end
{% endhighlight %}
{% highlight ruby linenos %}
def create
  @order = Order.new(params[:order])
  @order_completion = OrderCompletion.new(@order)
 
  if @order_completion.create
    redirect_to root_path, notice: 'Your order is being processed.'
  else
    @order = @order_completion.order
    render action: "new"
  end
end
{% endhighlight %}
Callbacks are great helpers but should only be used when they refer to the object’s internal state and comply with the single responsibility principle.