var fs = require('fs');
var _ = require("underscore");

function setEvaluateTotals(app, callback) {

        // var missionTypes = JSON.parse(data.toString());
        // var missionTypesMap = {};
        // missionTypes.map( function(mt) {
        //   missionTypesMap[mt.name] = _.extend({},mt,{id:mt.name});
        //   app.get('/destinations/' + mt.name, function (req, res) {
        //     res.contentType('application/json');
        //     res.send(
        //       JSON.stringify(missionTypesMap[mt.name]) );
        //   });
        // });
        // var missionTypesMapStr =
        //   JSON.stringify(
        //     Object.keys(missionTypesMap).map(
        //       function (mt_slug) {
        //         return missionTypesMap[mt_slug];
        //       } ));

        app.post('/evaluate-values', function (req, res) {
          var components = req.body;

          // var input = [
          // ];

          //var score = 0;

          var sum = function(sel) {
            return function(tot, comp) { return tot + sel(comp); };
          }
          var max = function(sel) {
            return function(tot, comp) {
              return tot == null || sel(comp) > tot ? sel(comp) : tot;
            };
          }
          var min = function(sel) {
            return function(tot, comp) {
              return tot == null || sel(comp) < tot ? sel(comp) : tot;
            };
          }
          var totals = {
            mass: {
              value: _.reduce(components, sum(_.property('mass')), 0 ),
              max: 1000 },
            volume: {
              value: _.reduce(components, sum(_.property('volume')), 0 ),
              max: 1000 },
            power: {
              value: _.reduce(components.filter( function(comp) {
                return comp.power < 0;
              }).map( function(comp) {
                return _.extend({}, _.omit(comp, 'power'), { power: -comp.power } );
              }), sum(_.property('power')), 0 ),
              max: _.reduce(components.filter( function(comp) {
                return comp.power >= 0;
              }), sum(_.property('power')), 0 ) },
            temperature: {
              "valueMin":
                _.reduce(components, max(_.property('minWorkingTemp')), null ),
              "valueMax":
                _.reduce(components, min(_.property('maxWorkingTemp')), null ),
              "min": -15, "max": 20
            },
            cost: _.reduce(components, sum(_.property('cost')), 0 )
          };

          res.contentType('application/json');
          res.send(JSON.stringify(totals));
        });


  callback(null);

}

module.exports = setEvaluateTotals;
