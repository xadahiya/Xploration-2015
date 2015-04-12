var express = require('express');
var path    = require('path');
var app = express();

var fs = require('fs');
var bodyParser = require('body-parser')
var missionTypes = require('./missionTypes');
var destinations = require('./destinations');
var componentTypes = require('./componentTypes');
var setEvaluateScore = require('./evaluateScore');
var setEvaluateTotals = require('./evaluateTotals');
var components = require('./components');

var apis = [
  { id: 'components',
    descr: 'Available components organized by categories' },
  { id: 'missionTypes',
    descr: 'Available mission types' },
  { id: 'destinations',
    descr: 'Available mission destinations' },
    { id: 'subsystems',
      descr: 'Available types of subsystems' },
      { id: 'evaluate-score',
        descr: 'Evaluate the score of a cube-sat' },
        { id: 'evaluate-values',
          descr: 'Evaluate the total values of a cube-sat' }
  ];
var apiStr = JSON.stringify(apis);

var app = express();
app.use(bodyParser());
app.use('/app', express.static(path.join(__dirname, '..', 'app')));

missionTypes(app, function(err) {
  if (err) { console.err(err); return; }

  destinations(app, function(err) {
    if (err) { console.err(err); return; }

    componentTypes(app, function(err) {
      if (err) { console.err(err); return; }

      setEvaluateScore(app, function(err) {
        if (err) { console.err(err); return; }

        setEvaluateTotals(app, function(err) {
          if (err) { console.err(err); return; }

          components(app, function(err) {
            if (err) { console.err(err); return; }

            app.get('/', function (req, res) {
              res.contentType('application/json');
              res.send(apiStr);
            });

            var server = app.listen(3000, function () {

              var host = server.address().address;
              var port = server.address().port;

              console.log('Back-end app listening at http://%s:%s', host, port);

            });

          });

        });

      });
    });

  });

});
