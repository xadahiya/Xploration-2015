// var express = require('express');
// var app = express();

var fs = require('fs');
var _ = require("underscore");

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
        Object.keys(componentTypes).map( function(systemName) {
          var system = componentTypes[systemName];
          subsystemsFiltered[systemName] = {
            id: system.slug,
            name: systemName,
            slug: system.slug,
            ontology: system.ontology
          };
          app.get('/subsystems/' + system.slug, function (req, res) {
            res.contentType('application/json');
            res.send(
              JSON.stringify(subsystemsFiltered[systemName]));
          });
        });
        var subsystemsArray = Object.keys(componentTypes).map( function(systemID) {
          var system = componentTypes[systemID];
          return {
            id: system.slug,
            name: systemID,
            slug: system.slug,
            ontology: system.ontology
          };
        });

        var subsystemsStr = JSON.stringify(subsystemsArray);
        app.get('/subsystems', function (req, res) {
          res.contentType('application/json');
          res.send(subsystemsStr);
        });


      });

  callback(null);

}

module.exports = componentTypes;
