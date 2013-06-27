travis Build Status
-------------------

[![Build Status](https://travis-ci.org/dfkaye/module-define.png)](https://travis-ci.org/dfkaye/module-define)

First repo of mine to do this - http://about.travis-ci.org/docs/user/getting-started/ - really like it so far

module-define
-------------

__In PROGRESS__ JavaScript shim for cross-platform module.define() and importScripts() APIs.

describe
--------

See my gist: [importScripts proposal](https://gist.github.com/dfkaye/5356885)

justify
-------

Stop using source transformation tools - they make the problem worse, not better.

Node.js part is boilerplate
---------------------------

The fact that the node test suite runs *at all* proves the concept that the 
module.define() and importScripts() boilerplate can be used to import files that 
don't use the boilerplate themselves (notably, the tape testing package itself), 
and can be used multiple times, in the same file, mimicking the script 
concatenation strategy used in browser web applications.

__Code noise__

- importScripts() paths must either be npm module names or top-directory relative paths.
- module.require() inside the the define callback can use module-relative paths.

Using [tape](https://github.com/substack/tape) to run tests from the node.js 
command line.

__from node command line__

    cd ./module-define
    
  any of these commands
    
    npm test
    node test/node
    node test/node/index
    node ./test/node/index.js

Browser tests with testem
-------------------------

__from node command line__

    cd ./module-define
    testem
    
  then open a browser at localhost:7357
  
  __or__ use this to run all browsers testem can find automatically
  
    testem ci


The NPM part
------------

__TODO__