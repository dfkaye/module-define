module.define('badname')(function(module) {

    console.log('badname defined');
    
    module.exports = badname;
    
    function badname() {
        console.log('badname exported')
        return true;
    }
})