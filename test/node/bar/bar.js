
/*
 * paths should be node_module names or app-relative paths
 */
importScripts('path', '../../test/node/foo')

module.define('bar')(function(module) {

    var foo = module.require('../foo');

    module.exports = bar;
    
    function bar() {
        return foo() + ':' + 'bar';
    }    
})