// var express = require('express');
// var app = express();

var fs = require('fs');
var _ = require("underscore");

function components(app, callback) {

  fs.readFile(
      'xploration-data/components.json',
      function (err, data) {
        if (err) {
          callback(err);
          return;
        }

        var components = JSON.parse(data.toString());
        // var componentsFiltered = components.map( function(comp) {
        //   var newComp =
        //       _.extend({}, comp.object, { id:comp.id, name:comp.name });
        //   if (componentsByType[] == undefined)
        //   return nuewComp;
        // });
        var componentsByType = _.groupBy(
          components.map( function(comp) {
            return _.extend({},
              _.omit(comp.object,'category'),
              { id:comp.id,
                name:comp.name,
                category:comp.object.category.replace(" ","-") });
          }),
          _.property('category')
        );

        var componentsStr = JSON.stringify(componentsByType);
        app.get('/components', function (req, res) {
          res.contentType('application/json');
          res.send(componentsStr);
        });


      });

  callback(null);

}

module.exports = components;
