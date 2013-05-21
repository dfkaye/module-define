/*
 * file nested at foo/foo
 */
module.define('foo')(function(module) {
    
    module.exports = foofoo;
    
    function foofoo() {
        return 'foofoo';
    }
});