/*
 * That these tests run at all is the first verification.
 */
importScripts('tape', 'path');

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
});

/*
 * foo returns 'foo'
 */
importScripts('tape', '../../test/node/foo');

module.define('suite')(function(module) {

    var test = module.require('tape');

    test('foo', function (t) {
    
      var foo = module.require('./foo');
      
      t.equal(typeof foo, 'function');
      t.equal(foo(), 'foo');

      t.end();
    });
});

/*
 * bar requires foo, returns 'foo:bar'
 */
importScripts('tape', '../../test/node/bar/bar');

module.define('suite')(function(module) {

    var test = module.require('tape');

    test('bar', function (t) {
    
      var bar = module.require('./bar/bar');
      
      t.equal(typeof bar, 'function');
      t.equal(bar(), 'foo:bar');

      t.end();
    });
});

/*
 * filename vs. module.define name mismatches
 */
;(function () {

    var test = module.require('tape');
    
    test('catch "badname" mismatch in bad-name.js', function (t) {
            
        try {
          importScripts('tape', '../../test/node/bad-name');
          t.fail('should have bonked on badname mismatch');
        } catch (err) {
          t.ok(err, 'importScripts threw an exception on bad-name.js vs "badname" mismatch');
        }
        
        t.end()
    });
}());

module.define('suite')(function(module) {

    var test = module.require('tape');

    test('catch "badname" mismatch in bad-name.js', function (t) {
    
      var path = module.require('path');
     
      try {
        module.require('./bad-name.js');
        t.fail('should have bonked on badname mismatch');
      } catch(err) {
        t.ok(err, 'require threw an exception on bad-name.js vs "badname" mismatch');
      }
      
      t.end();
    });
});

/*
 * nested filename foo/foo
 */
importScripts('tape', '../../test/node/foo', '../../test/node/foo/foo');

module.define('suite')(function(module) {

    var test = module.require('tape');

    test('foofoo', function (t) {
    
      var foo = module.require('./foo');
      var foofoo = module.require('./foo/foo');
      
      t.equal(foo(), 'foo');
      t.equal(foofoo(), 'foofoo');
      
      t.end();
    });
})