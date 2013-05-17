if (process) {
    console.log('node');
    require('./node/module-define');
} else if (window) {
    console.log('window');
}