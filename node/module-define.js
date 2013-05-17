// create shims for module.define() and importScripts() in the node.js environment, only if necessary.

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
               
        if (location.charAt(0) == '.') {
            location = path.resolve(__dirname + location);;
        }
        
        require(location);
    });
};