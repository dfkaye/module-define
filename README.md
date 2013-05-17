module-define
=============

__In PROGRESS__ JavaScript shim for cross-platform module.define() and importScripts().


Why
===

See my gist: [importScripts proposal](https://gist.github.com/dfkaye/5356885)


Node.js tests with tape & testling
==================================

Using [tape](https://github.com/substack/tape) to run tests from the node.js 
command line, and in order to use [testling](http://ci.testling.com/) from the
github service hook.

[![browser support](https://ci.testling.com/dfkaye/module-define.png)](https://ci.testling.com/dfkaye/module-define)

[Things I've found about checking things in for testling to work](https://gist.github.com/dfkaye/5225546)


__from node command line__

    cd ./module-define/test/node
  
    node suite.js
    
    
Browser tests with testem
=========================

