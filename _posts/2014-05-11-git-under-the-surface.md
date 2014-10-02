---
layout: post
tagline: "git's inner magics"
tags : [git]
---
{% include JB/setup %}

Git’s Inner Magic

When we create a new git repository, a .git directory is created that stores almost all the files created through git. 

![Image description]({{ site.url }}/assets/images/2014-05-11_img3.jpg) 

The core of git’s functionality is stored within the 4 highlighted files: HEAD, index, objects and refs. In this post I will be going more in depth on the objects directory. 

####Git Objects

Git is basically a hash object - everything is stored in a key-value hash system. There are 4 different types of objects in Git: blob, tree, commit and tag objects.

####Blob Objects

Blob objects are files that only have content and are stored with no file name, just its SHA-1 key. We can see how git creates this key by creating a file using the hash-object command which will assign a key to the content. 

![Image description]({{ site.url }}/assets/images/2014-05-11_img2.jpg) 

We can see what type of object was created by using the cat-file command which pulls back out the content and assigning -t command.

![Image description]({{ site.url }}/assets/images/2014-05-11_img4.jpg) 

The key that’s created is a 40 character check sum, the SHA-1 hash.

What is that big long hash that git creates? 

Basically, git takes the content of a file and creates a header. It then joins these two strings together and calculates the SHA-1 value of it. This is compressed and onto the disk with the SHA-1 value which then serves as the key.

Each time a new version of a file is created, a new SHA-1 value will be created according to it’s content and header. 

![Image description]({{ site.url }}/assets/images/2014-05-11_img5.jpg) 

This creates a test.txt file that is saved in versions and linked to one another:



By assigning a different hash to a file you can revert back to a different version of that file. 

![Image description]({{ site.url }}/assets/images/2014-05-11_img6.jpg) 

####Tree Objects

Similar to how UNIX creates directories, git has tree objects that contain hash keys pointing to more subtrees and blob objects. A tree is usually created according to the state of your staging area or index.

![Image description]({{ site.url }}/assets/images/2014-05-11_img1.jpg) 

####Commit Objects

Commit objects point to all the trees created at a certain point in a project using the SHA-1 hash value. Aside from grouping together trees and blob objects, commits also stores essential information such as dates and names of commiters facilitating the tracking of different stages in the project.

####Tag Objects

Tag objects point to commits and contain information such as tagger, date and message. Tags just make tracking commits easier as they give out more information about the specific commit they’re pointing at.
