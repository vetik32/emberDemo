
#Install
---

##env

> Assuming you already have node.js and npm installed

    $ npm install -g bower grunt grunt-cli

##compass
on debian/ubuntu like systems:

    $ sudo apt-get install ruby-compass

or e.g. osx:

    $ gem update --system
    $ gem install compass
    
##npm dependencies
    $ npm install

##bower dependecies
    $ bower install

#Start emberDemo
    $ grunt serve

#Test
> From project root directory

    $ cd test; bower install; grunt test

