var express = require('express');
var app = express();

var fs = require('fs');
var missionTypes = require('./missionTypes');
var destinations = require('./destinations');
var componentTypes = require('./componentTypes');

var apis = [
  { id: 'missionTypes',
    descr: 'Available mission types' },
  { id: 'destinations',
    descr: 'Available mission destinations' },
    { id: 'subsystems',
      descr: 'Available types of subsystems' }
  ];
var apiStr = JSON.stringify(apis);

missionTypes(app, function(err) {
  if (err) { console.err(err); return; }

  destinations(app, function(err) {
    if (err) { console.err(err); return; }

    componentTypes(app, function(err) {
      if (err) { console.err(err); return; }

      app.get('/', function (req, res) {
        res.contentType('application/json');
        res.send(apiStr);
      });

      var server = app.listen(3000, function () {

        var host = server.address().address;
        var port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);

      });

    });

  });

});
