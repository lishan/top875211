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

fs.readFile(process.argv[2], function(err, data) {
    parser.parseString(data, function (err, result) {
        var obj = {};
        for(var prop in result["RU50_EventFeed"]["Game"][0]["$"]){
            obj[prop] = result["RU50_EventFeed"]["Game"][0]["$"][prop];
        }
        for(var prop in result["RU50_EventFeed"]["Game"][0]["Event"][0]["$"]){
            obj[prop] = result["RU50_EventFeed"]["Game"][0]["Event"][0]["$"][prop];
        }
        for(var index in result["RU50_EventFeed"]["Game"][0]["Event"][0]["Qualifiers"]){
            var num = parseInt(index) + 1;
            obj["qualifier_" + num] = JSON.stringify(result["RU50_EventFeed"]["Game"][0]["Event"][0]["Qualifiers"][index]["$"]);
        }
        var xml = new Fact(obj);
        xml.save();
        mongoose.connection.close();
    });
});
