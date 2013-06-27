// testem - http://localhost:7357/

QUnit.module('globals')

QUnit.test('importScripts should be a function', function() {
    QUnit.equal(typeof importScripts, 'function')
})

QUnit.test('module should not be QUnit.module', function() {
    QUnit.ok(module)
    QUnit.notEqual(module, QUnit.module)
    QUnit.ok(module instanceof module.constructor)
    QUnit.ok(QUnit.module instanceof QUnit.module.constructor)
    QUnit.notEqual(module.constructor, QUnit.module.constructor)
})

QUnit.test('module api', function() {

    QUnit.ok(module)
    QUnit.notEqual(module, QUnit.module)
})

QUnit.asyncTest('import module and require', function() {

    importScripts('../test/browser/suite')

    setTimeout(function() {
    
        var suite = module.require('../test/browser/suite')
        
        suite()
        QUnit.start()
        
    }, 100)
})
   
QUnit.asyncTest('module.define', function(){

    QUnit.expect(3)
    
    module.define('../test/browser/suite2')(function(module) {
        
        QUnit.ok('suite2 loaded')
        
        module.exports = suite2;
        function suite2() {
        
            QUnit.ok('suite2 exported')

            return module.id
        }
        
    })

    setTimeout(function() {
    
        module.define('test_suite3')(function(module){

            var suite2 = module.require('../test/browser/suite2')
            var id = suite2()

            QUnit.ok(id.indexOf('test/browser/suite2.js') !== -1, id)
            
            QUnit.start()
        })
        
    }, 300)
})