var fs = require('fs');

  fs.readFile(
      '../subsystems.json',
      function (err, data) {
        if (err) {
          callback(err);
          return;
        }

        var subSystems = JSON.parse(data.toString());
        Object.keys(subSystems).map(
          function (subSystemId) {
            console.log(subSystemId);
          } );


      });
