
/*
 * paths should be node_module names or app-relative paths
 */
importScripts('path', '../../test/node/foo')

module.define('bar')(function(module) {

    console.log('bar defined');
    
    module.exports = bar;
    
    function bar() {
        console.log('bar exported')
        console.log('has foo: ' + foo());
        
        return true;
    }
    
    var foo = module.require('../foo');
})