var parser = require('xml2js').Parser();
var fs = require('fs');
var config = require('./config.js')();
var mongoose = require('mongoose');
var Fact = require('./fact.js');

if(process.argv.length !== 3){
    console.log("Usage: node converter.js <YOUR XML FILE>");
    process.abort();
}

fs.statSync(process.argv[2], function(err, stats){
    if(!stats.isFile()){
        console.log("Usage: node converter.js <YOUR XML FILE>");
        process.abort();
    }
});

mongoose.connect(config['db']);
console.log("Mongo connection has been created!");

fs.readFile(process.argv[2], function(err, data) {
    parser.parseString(data, function (err, result) {
        var obj = {};
        for(var i = 0; i < result[config['rootNode']]["Game"].length; i++){
            var element = result[config['rootNode']]["Game"][i];
            for(var prop in element["$"]){
                obj[prop] = element["$"][prop];
            }
            for(var prop in element["Event"][0]["$"]){
                obj[prop] = element["Event"][0]["$"][prop];
            }
            for(var index in element["Event"][0]["Qualifiers"]){
                var num = parseInt(index) + 1;
                obj["qualifier_" + num] = JSON.stringify(element["Event"][0]["Qualifiers"][index]["$"]);
            }
            var xml = new Fact(obj);
            xml.save();
        }
        mongoose.connection.close();
        console.log("Disconnected!");
    });
});
