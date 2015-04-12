var fs = require('fs');
var _ = require("underscore");

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
          missionTypesMap[mt.name] = _.extend({},mt,{id:mt.name});
          app.get('/destinations/' + mt.name, function (req, res) {
            res.contentType('application/json');
            res.send(
              JSON.stringify(missionTypesMap[mt.name]) );
          });
        });
        var missionTypesMapStr =
          JSON.stringify(
            Object.keys(missionTypesMap).map(
              function (mt_slug) {
                return missionTypesMap[mt_slug];
              } ));
        app.get('/destinations', function (req, res) {
          res.contentType('application/json');
          res.send(missionTypesMapStr);
        });


      });

  callback(null);

}

module.exports = destinations;
