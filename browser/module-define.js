
;(function (global) {

    global || (global = window)
    
    if (typeof global.importScripts == 'function') {
        return global.importScripts
    }
    
    var modules = []
    var requested = {}
    var paths = []
    var pathErrors = {}
    
    var scripts = document.getElementsByTagName('script')
    var parentNode = scripts[0].parentNode
    var i = scripts.length
    
    var src, path, main

    global.module = new Module('.')
    global.importScripts = importScripts
    
    while (i--) {

		src = scripts[i].src

		if (src.match(/module-define.js/)) {

			path = src.split('module-define.js')[0]
			main = scripts[i].getAttribute('data-main')
            
            if (main) {
            
                //console.warn('loading main')
                
                module.request(path + main)
            }
            
			break
		}
	}
    
    function importScripts() {
    
        var len = arguments.length
        var filename
        
        while (len--) {
        
            filename = module.normalize(path + arguments[len])
             
            //console.warn('dep push %s for %s', filename, module.id)
            // FIXME - GRAPH DEPENDENCIES ONLY
            module.dependencies.push(filename)

            if (!modules[filename] && !requested[filename]) {
                //console.warn('importing %s for %s as %s', arguments[len], global.module.filename, filename)

                requested[filename] = 1
                module.request(filename)
            }
        }
	}

    /*
      * Module constructor
      */
      
    function Module(id) {
        this.id = id || '__pending__'
        this.filename = id || '__pending__'
        this.loaded = false
        this.parent = null
        this.children = []
        this.dependencies = []
        this.exports = {}
	}

    Module.prototype.normalize = (function () {
    
        var BLANK = ''
        var SLASH = '/'
        var DOT = '.'
        var DOTS = DOT.concat(DOT)
        var SCHEME = '://'

        return function normalize(path) {

            if (!path || path === SLASH) {
                return SLASH
            }

            /*
               * for IE 6 & 7 - use path.charAt(i), not path[i]
               */
            var prependSlash = (path.charAt(0) == SLASH || path.charAt(0) == DOT)
            var target = []
            var src, scheme, parts, token
            
            if (path.indexOf(SCHEME) > 0) {
            
                parts = path.split(SCHEME)
                scheme = parts[0]
                src = parts[1].split(SLASH)
                
            } else {
            
                src = path.split(SLASH)
            }

            for (var i = 0; i < src.length; ++i) {
            
                token = src[i]
                
                if (token === DOTS) {
                    target.pop()
                } else if (token !== BLANK && token !== DOT) {
                    target.push(token)
                }
            }

            var result = target.join(SLASH).replace(/[\/]{2,}/g, SLASH)
            
            if (result.indexOf('.js') !== result.length - 3) {
            
                global.console && console.log('REMOVE ME') && console.log('normalizing name w/o js')
                
                result = result + '.js'
            }
            
            return (scheme ? scheme + SCHEME : '') + (prependSlash ? SLASH : BLANK) + result
        }
    }())
    
    Module.prototype.define = define;
    function define(id) {
    
        var module = this
        var filename = module.normalize(path + id)
   
        //console.log('module.define: ' + id + '; ' + filename + ';\n' + module.id + '; ' + module.filename)

        if (modules[filename]) {
            throw new Error(id + ' is already defined')
        }
        
        module.id = filename
        module.filename = filename
        modules.push(module)
        modules[filename] = module
                
        return function (factory) {
            module.factory = factory
            module.resolve(filename)
            
            //
            global.module = new Module()
        }
    }
    
    Module.prototype.pathError = pathError;
    function pathError(filename) {

        var module = this
        
        if (!(filename in pathErrors)) {
            pathErrors[filename] = 0
        }

        pathErrors[filename] += 1

        //console.error('bad request for "%s" from "%s"', filename, module.filename)
    }

    Module.prototype.require = require;
    function require(id) {
    
        var module = this        
        var filename = module.normalize(path + id)
        var file = modules[filename]
        
        if (!(file && file.loaded)) {
            throw new Error(this.id + '#require() - could not resolve path to module ' + filename)
        }
       
        return file.exports
    }
    
    Module.prototype.resolve = resolve;
    function resolve(filename) {

        var module = this
        
        // FIXME ~ duplicate assignment from module.define
        // SHOULD TEST FILENAME AGAINST EXPECTED FILENAME?
        //console.log('resolve: %s for %s', filename, module.filename)
        
        if (module.id == '__pending__') {
            module.id = filename
            module.filename = filename
        }
        
        module.dirname = module.filename.substr(0, module.filename.lastIndexOf('/'))       
        // aha - internal modules map
        modules[filename] = modules[filename] || module
            
        var i = modules.length
        var ready = 1
        
        while (i-- && ready) {

            ready = module.resolvePath(modules[i].filename)
        }
        
        if (ready) {
            module.loaded = 1
        }
    }    

    Module.prototype.request = request
    function request(filename) {

        var module = this
        
        if (filename.indexOf('.js') !== filename.length - 3) {
        console.log('requested name w/o js')
            filename = filename + '.js'
        }
        
        var script = document.createElement('script')
        
        script.src = filename
        script.onload = script.onreadystatechange = function () {

            if (!script.readyState || script.readyState.match(/loaded|complete/i)) {

                script.onload = script.onreadystatechange = null
                module.resolve(filename)
            }
        }

        script.onerror = function (e) {
            //alert(e)
            module.pathError(filename)
        }

        parentNode.appendChild(script)
	}
    
    Module.prototype.resolvePath = resolvePath;
    function resolvePath(path) {

        //console.warn('resolvePath %s, %s for %s', (path != forPath), path, forPath)
        var module = this
        var forPath = module.filename

        var mod = modules[path]
        var deps
        var len
        var ready = 0

        if (pathErrors[path]) {
            return true
        }

        if (!mod && path != forPath) {
            //console.log('module not executed yet: ' + path + ' for ' + forPath)
            return false
        }

        if (!mod.loaded) {

            deps = mod.dependencies
            len = deps.length
            ready = 1

            while (len-- && ready) {
            
              /*
                   * cycle detection
                   */

              if (deps[len] !== forPath) {
                ready = module.resolvePath(deps[len])
              }
              else {
                // FIX ME - REMOVE OR COMMENT BEFORE PROD
                global.console 
                && 
                console.log('REMOVE OR COMMENT BEFORE PROD') 
                && 
                console.log('cycle: ' + deps[len] + ', ' + forPath)
              }
            }

            if (ready) {
                mod.loaded = 1
                typeof mod.factory !== 'function' || (mod.factory.call(mod.exports, mod))
            }
        }

        //console.log('resolve for %s ? %s', path, mod.loaded)

        //return !!mod || mod.loaded // stupid
        // ----- fine line between -----
        return mod.loaded // clever
    }
}())