
/*
QUnit.module('module.define');

QUnit.test('module define', function(){
    //ok(false);
});
*/

module.define('../test/browser/suite')(function(module) {

    var dir = 'test/browser'
    var path = dir + '/suite'
    
    module.exports = suite;    
    function suite() {
    
        QUnit.test('suite loaded', function(){
            QUnit.ok('suite loaded')
        });

        QUnit.test('module.id', function(){
            QUnit.ok(module.id.indexOf(path) !== -1, module.id)
        });
        
        QUnit.test('module.filename', function(){
            QUnit.ok(module.filename.indexOf(path) !== -1, module.filename)
        });
        
        QUnit.test('module.dirname', function(){
            QUnit.ok(module.dirname.indexOf(dir) !== -1, module.dirname)
        });
        
        QUnit.ok('suite complete')
    }
})