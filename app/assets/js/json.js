define(['jquery'], function($) {
  var cache = {};
  return {
    load: function(name, req, onload, config) {
      if (cache[name]) { return onload(cache[name]); }
      return Backbone.ajax({
        url: 'json/' + name + '.json?bust=' + Date.now(),
        dataType: 'json',
        success: function(data, status, jqXHR) {
          cache[name] = data;
          return onload(data);
        },
        error: function(jqXHR, status, err) {
          return onload.error({ message: err || status });
        }
      });
    }
  };
});



