---
layout: post
tagline: "Refactoring with Ruby Methods"
tags : [ruby, refactoring]
---

I was in desperate need today to find ways to shorten my code for the Maze Solver as it keeps getting longer and far from being readable. Here’s a few great methods and syntax shortcuts that I haven’t used before: 

####Strip Method

The class initializes with a string that will need to be converted into a 2D array so the outer array represents the rows and the inner array the columns. 

![Ruby strip method example1]({{ site.url }}/assets/images/2014-05-29_img1.jpg)

Each row of the maze ends with a new line (\n) so I will go ahead use the split method on those to get my array.

![Ruby strip method example2]({{ site.url }}/assets/images/2014-05-29_img2.jpg)

Now I can clearly see that each element in the array has multiple spaces that I need to get rid of. Here’s where the strip method comes in handy:

![Ruby strip method example3]({{ site.url }}/assets/images/2014-05-29_img3.jpg)

Perfect! I went over each element in the array that represents my rows, and the strip method takes out any white spaces from either side of the string. I went ahead and added the split method to create that 2D array representing the columns.

####Map.with_index Method

The maze solver uses the array’s index values to determine the position of each node so I found myself repeatedly searching for indexes every time I was iterating over the array. Here’s an example where map.with_index came in handy: 

{% highlight ruby %}
def start_position
  current_node = []
  @maze_arr.map do |row|
    row.map do |node|
      if (node == "->")
        current_node << [row.index(node), @maze_arr.index(row)]
      end
    end
    current_node
  end
end
{% endhighlight %}


Using the map.with_index I get each element in the array plus its index making the code much cleaner and easier to read: 

{% highlight ruby %}
def start_position
  current_node = []
  @maze_arr.map.with_index do |row, y|
    row.map.with_index do |node, x|
      if (node == "->")
        current_node << [x,y]
      end
    end
    current_node
  end
end
{% endhighlight %}


####Multiple Variable Assignment

This is a cool feature in Ruby, I can’t believe I haven’t been using it more often. Here’s an example in which, again, I need the index values of a specific node. The node in this case is an array with only two values: 

{% highlight bash %}
def start_position
  current_node = []
  @maze_arr.map.with_index do |row, y|
    row.map.with_index do |node, x|
      if (node == "->")
        current_node << [x,y]
      end
    end
    current_node
  end
end
{% endhighlight %}

Instead, all I need to do is this:

image