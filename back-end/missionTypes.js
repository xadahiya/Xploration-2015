// var express = require('express');
// var app = express();

var fs = require('fs');

function missionTypes(app, callback) {

  fs.readFile(
      'xploration-data/missions.json',
      function (err, data) {
        if (err) {
          callback(err);
          return;
        }

        var missionTypes = JSON.parse(data.toString());
        var missionTypesMap = {};
        missionTypes.map( function(mt) {
          missionTypesMap[mt.slug] = mt;
          app.get('/missions/' + mt.slug, function (req, res) {
            res.send(
              JSON.stringify(missionTypesMap[mt.slug]) );
          });
        });
        app.get('/missions', function (req, res) {
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

module.exports = missionTypes;
