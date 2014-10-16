---
layout: post
tagline: "Migrator Class in Sequel"
tags : [ruby, gems, sequel]
---

Today we were introduced to the Sequel gem as part of our intro into databases.

One of the cool things we covered was the use of migration, which is basically a version control feature when dealing with databases. The same way we use git to save our work at different stages of our coding process and allow a productive way of collaborating, migration does the same. When changes to a database are done through migration, that same version should have the steps needed to revert back on those changes. In Rails, Active Record knows how to revert in most cases, otherwise one can specify them manually.

In the Sequel gem that we covered in lecture today, migration includes both the up/down blocks and the change block.

####Up/Down block 

 The up is used to apply the changes on the database and in the down block we can specify the ways to revert those changes. 

{% highlight ruby  %}
require 'sequel'
Sequel.extension :migration
Sequel.migration do
    up do
        create_table(:artists) do
            primary_key :id
            String :name, :null=>false
        end
    end
    down do
        drop_table(:artists)
    end
end
{% endhighlight %}

####Change block 
Will try to do the revert for us if it knows how to. This will work for a large majority of the methods, such as:

create_table, add_column, add_index, rename_column, alter_table

{% highlight ruby  %}
Sequel.migration do
    change do
        create_table(:artists) do
            primary_key :id
            String :name, :null=>false
        end
    end
end
{% endhighlight %}

####File naming and execution

Migration files should be stored in one location with based on Sequel::Migration and named in ascending numerical order following the pattern of version_title, such as:

{% highlight ruby  %}
001_create_sessions.rb
002_add_data_column.rb
003_add_index.rb
...
{% endhighlight %}

Using the migrator module migrations can be use to go back and forth one could either specify both the version from and to it’s migrating to:

{% highlight bash %}
Sequel::Migrator.apply(DB, '.', 5, 1)
{% endhighlight %}

otherwise the database will migrate to the latest version available.

{% highlight bash %}
Sequel::Migrator.apply(DB, '.')
{% endhighlight %}