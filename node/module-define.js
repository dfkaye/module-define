// shim define() and importScripts() only if necessary

if (typeof module.define == 'function') {
	return module.exports;
}

var Module = require('module');
var path = require('path');

Module.prototype.define = define;

function define(id) {

    var module = this;
    
    var location = id;
    
    if (!path.extname(location)) {
        location = location + '.js';
    }

    //console.log('filename: ' + module.filename + ' and dirname: ' + __dirname)
    //location = path.resolve(path.dirname(module.parent.filename), location);
    if (location.charAt(0) == '.') {
        location = path.resolve(location);;
    }
    if (module.id.indexOf(location) !== module.id.length - location.length) {
        throw new Error('id \"' + id + '\" wrongly defined for module at ' + module.id);
    }
    
    return function (fn) {
        run.call(module, fn);
    }
};

function run(fn) {
    
    if (typeof fn == 'function') {
        fn.call(this.exports, this);
    }
};


if (typeof global.importScripts == 'function') {
	return module.exports;
}
global.importScripts = importScripts;

function importScripts() {
    
    [].slice.call(arguments).forEach(function(id) {
        var location = id;
        console.log('__dirname :' + __dirname)
        console.log('resolve ' + location + ' to ' + path.resolve(__dirname + location));
               
        if (location.charAt(0) == '.') {
            location = path.resolve(__dirname + location);;
        }
        
        console.log('path: ' + location)
        require(location);
    });
};