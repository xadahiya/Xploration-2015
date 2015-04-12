var fs = require('fs');
var _ = require("underscore");

function setEvaluateScore(app, callback) {

  // fs.readFile(
  //     'xploration-data/destinations.json',
  //     function (err, data) {
  //       if (err) {
  //         callback(err);
  //         return;
  //       }

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

        app.post('/evaluate-score', function (req, res) {
          var input = req.body;

          // var input = {
          //   //components: [],
          //   payload: {id: "A"},
          //   fundamentalComponents: [{id:"A"}, {id:"B"}],
          //   scientificInterest: 2000, // 1000-5000
          //   mass: { value: 250, max: 1000},
          //   volume: { value: 250, max: 1000},
          //   power: { value: 250, max: 1000},
          //   temperature: { valueMin: 7, valueMax: 28, min: -15, max: 20}
          // };

          var score = 0;

          if (  input.fundamentalComponents.map(function(comp) {
                  return comp.id;
                }).indexOf(input.payload.id) >= 0) {
            var temp = input.temperature;
            var temperatureScore =
                ( temp.valueMin - temp.min < 5
                  || temp.max - temp.valueMax < 5) ?
                      -2000:
                      500;
            score +=
              4500 * input.power.value / input.power.max
              + 3000 * input.volume.value / input.volume.max
              + 1500 * input.mass.value / input.mass.max
              + input.scientificInterest
              + temperatureScore;
          }

          var output = {
            score: score
          };

          res.contentType('application/json');
          res.send(JSON.stringify(output));
        });


      // });

  callback(null);

}

module.exports = setEvaluateScore;
