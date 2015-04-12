// var express = require('express');
// var app = express();

var fs = require('fs');

function componentTypes(app, callback) {

  fs.readFile(
      'xploration-data/subsystems.json',
      function (err, data) {
        if (err) {
          callback(err);
          return;
        }

        var componentTypes = JSON.parse(data.toString());
        var subsystemsFiltered = {};
        Object.keys(componentTypes).map( function(systemID) {
          var system = componentTypes[systemID];
          subsystemsFiltered[systemID] = {
            slug: system.slug,
            ontology: system.ontology
          };
        });
        var subsystemsStr = JSON.stringify(subsystemsFiltered);
        app.get('/subsystems', function (req, res) {
          res.contentType('application/json');
          res.send(subsystemsStr);
        });


      });

  callback(null);

}

module.exports = componentTypes;
