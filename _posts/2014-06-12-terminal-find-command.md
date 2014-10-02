---
layout: post
tagline: "Finding Files Using The Find Command"
tags : [terminal, bash]
---

After long procrastination, I decided to reorganize my directory structure for my lab files. This was the perfect excuse to practice some terminal commands since using the finder wouldn’t make sense in this case. I had organized my labs according to dates (inspired by a certain flatiron fellow…) which after a week became incredibly difficult to manage.

{% highlight bash %}
[10:07:33] (master) labs:todos shellyser ♥ ls 
05-01-14 05-09-14 05-19-14 06-02-14 06-11-14 
05-02-14 05-12-14 05-20-14 06-03-14 README.md 
05-05-14 05-13-14 05-21-14 06-04-14 emergency 
05-06-14 05-14-14 05-22-14 06-05-14 fake_hash.rb 
05-07-14 05-15-14 05-23-14 06-06-14 pg-quiz-sql-bk-001 
05-08-14 05-16-14 05-30-14 06-09-14 spec
{% endhighlight %}

What made it even harder was that inside each of these directories I had 2 additional directories…

{% highlight bash %}
[10:08:33] (master) 05-01-14
shellyser ♥ ls
todo    lab 
{% endhighlight %}

I needed to find a way to access all the directories 3 levels into the structure tree and copy them into a new directory that I created called tmp. After some extensive search I found a powerful terminal command, find, which in conjunction with other commands can be extremely specific in it’s search. After a while of trial and error this is what did the trick:

{% highlight bash %}
[19:47:37] (master) labs:todos
shellyser ♥ find . -type d -mindepth 2 -iname "lab" -iname "todo" -exec cp -R '{}' tmp/ \; {% endhighlight %}

So what happened here?

{% highlight bash %}
[19:47:37] (master) labs:todos
shellyser ♥ find . -type d -mindepth 2 -iname "lab" -iname "todo"
{% endhighlight %}

This first part of this command is basically saying find from this current directory of only type directories, no files, starting 2 subdirectories in with a case insensitive name of “lab” or “todo”.

{% highlight bash %}
[19:47:37] (master) labs:todos
shellyser ♥ -exec cp -R '{}' tmp/ \;
{% endhighlight %}

The second part is saying to execute a copy recursively (-R) from the results (‘{}’) into the temp/ directory. The -R command is what is allowing this to happen for each and every file otherwise the command would only try to move the “todo” and “lab” directories which would fail due to duplicate directories with the same name.

{% highlight bash %}
[21:27:43] (master) tmp
shellyser ♥ ls
lab todo
[21:30:02] (master) lab
shellyser ♥ ls
accumulator.js-bk-001     js-fizzbuzz-bk-001      playlister-generator-bk-001
adults_only-bk-001      js-meal-choice-bk-001     playlister-rb-bk-001
allergies.js-bk-001     js-speaking-grandma-bk-001    rake-todo-bk-001
.........
{% endhighlight %}

Now all that’s left is to reorganize these using a better system… But that’s for the next blog post!