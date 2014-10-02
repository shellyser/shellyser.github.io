---
layout: post
tagline: "An Intro to Closures"
tags : [javascript]
---
{% include JB/setup %}

With our shift into Javascript this week, I've found myself getting lost over and over with the way it handles manipulation of functions, scoping and environments. I know that for the most part things will start to fall into place with constant practice and reading but I was hoping that if I dig deeper into some basic concepts it would all just magically make sense to me. I have been coming across this one concept, closures, a lot in our readings and in this one great article Steven had posted (http://www.toptal.com/javascript#hiring-guide) so I thought I would look more into it. 

So, closures, yes. Javascript, like many other languages supports closures. Closures refer to functions that live within other functions and the connection to the scope in which they were created. By accessing variables outside their scope these functions keep referring to them within their environment even after the outer function has been executed. Yes, sounds complicated and I think the only way to really understand this concept is by seeing examples. 

Lets say we had this function foo:

![Closure Example1]({{ site.url }}/assets/images/2014-05-27_img1.png) 

Lets see what happens when we assign function foo to a variable called bar:

![Closure Example2]({{ site.url }}/assets/images/2014-05-27_img2.jpg) 

Bar is now a function variable of foo with the argument of 2 passed on to it. Now we can access the inner function of foo and we pass in 0 as an argument. The result of console.log will be 6 (2+0+(4)). When we call bar again and pass the argument 0 we see that the temp variable has maintained its value and is being incremented every time we call on the function. In other words, the temp variable is enclosed within the current environment hence the name closure.

And what happens if we assign foo to a new variable?

![Closure Example3]({{ site.url }}/assets/images/2014-05-27_img3.jpg) 

The environment in which the variable temp is enclosed is now renewed within this new variable of bar2. 

One side effect of this feature is that since the inner functions variable is only referring to the variable in the outer scope it will change if the outer variable is updated. Lets look at this example:

![Closure Example4]({{ site.url }}/assets/images/2014-05-27_img4.png) 

The result array holds 3 instances of the function which are all closures holding the i variable. Since the i variable is referring to the outer scope environment all three functions are constantly changing their i value with the for loop. In order to prevent this from happening we need to replicate the i variable into a new variable and wrap the function within another function. This additional function is referred to a IIFE, Immediately-Invoked Function Expression. Now are function looks like this:

![Closure Example5]({{ site.url }}/assets/images/2014-05-27_img5.jpg) 

Complicated? Yes! Closures are so common in Javascript, I've probably used them without knowing. Although it will take a while to master this, being aware of closures might help next time Javascript is not behaving the way I want it to and hopefully will uncover some of the mysterious ways Javascript behaves. The cool thing is that closures is a basic programming concept and learning about it through Javascript will transcend to almost any other programming language. 







