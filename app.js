var express = require('express');
var app = express();
var config = require('./config.js')();
var mongoose = require('mongoose');
var Fact = require('./fact.js');

mongoose.connect(config['db']);

app.get(config.api + ":id", function (req, res) {
  Fact.find({
    game_id: req.params.id
  }, function(err, fact){
    result = JSON.stringify(fact, null, 2);
    res.send(result);
  });
});

app.listen(config.port, function () {
  console.log('Rest server is listening port ' + config.port + ' !');
});