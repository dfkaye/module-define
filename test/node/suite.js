
importScripts('tape', 'path', './foo')

module.define('suite')(function(module) {

    var test = module.require('tape');

    test('module.define', function (t) {

      t.equal(typeof module.define, 'function');
      t.end();
    });

    test('importScripts', function (t) {

      t.equal(typeof importScripts, 'function');
      t.end();
    });

    var path = module.require('path');
    
    test('id', function (t) {
          
      t.equal(module.id, path.normalize(__dirname + '/' + 'suite' + '.js'));
      t.end();
    });
    
    test('filename', function (t) {
    
      t.equal(module.filename, path.normalize(__dirname + '/' + 'suite' + '.js'));
      t.end();
    });
})

importScripts('tape', './foo')

module.define('suite')(function(module) {

    var test = module.require('tape');

    test('foo', function (t) {
      var foo = module.require('./foo');
      
      t.equal(typeof foo, 'function');
      
      foo()
      t.end();
    });
})


importScripts('tape', './bar/bar')

module.define('suite')(function(module) {

    var test = module.require('tape');

    test('bar', function (t) {
      var bar = module.require('./bar/bar');
      
      t.equal(typeof bar, 'function');
      
      bar()
      t.end();
    });
})

