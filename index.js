if (process) {
    console.log('node');
    require('./node/module-define');
} else if (window && document) {
    console.log('window && document');
    var script = document.createElement('script');
    script.src = './browser/module-define.js';
    document.getElementsByTagName('head')[0].appendChild(script);
}