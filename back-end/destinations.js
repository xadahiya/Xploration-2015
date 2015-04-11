// var express = require('express');
// var app = express();

var fs = require('fs');

function destinations(app, callback) {

  fs.readFile(
      'xploration-data/destinations.json',
      function (err, data) {
        if (err) {
          callback(err);
          return;
        }

        var missionTypes = JSON.parse(data.toString());
        var missionTypesMap = {};
        missionTypes.map( function(mt) {
          missionTypesMap[mt.name] = mt;
          app.get('/destinations/' + mt.name, function (req, res) {
            res.send(
              JSON.stringify(missionTypesMap[mt.name]) );
          });
        });
        app.get('/destinations', function (req, res) {
          res.contentType('application/json');
          res.send(
            JSON.stringify(
              Object.keys(missionTypesMap).map(
                function (mt_slug) {
                  return mt_slug;
                } )));
        });


      });

  callback(null);

}

module.exports = destinations;
