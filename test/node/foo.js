/*
 * standalone foo module
 */
module.define('foo')(function(module) {
    
    module.exports = foo;
    
    function foo() {
        return 'foo';
    }
});