
module.define('foo')(function(module) {

    console.log('foo defined');
    
    module.exports = foo;
    
    function foo() {
        console.log('foo exported')
        return true;
    }
})