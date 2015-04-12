define([
  'jquery', 
  'underscore', 
  'backbone',
  'json!missions'
], function($, _, Backbone, missions) {

  var AppModel = Backbone.Model.extend({
    
    initialize: function() {
      Backbone.Model.prototype.initialize.apply(this, arguments);
      var self = this;
      this.set('missions', missions);
      this.set('configuration', []);
      $.ajax({
        url: '/components',
        dataType: 'json',
        success: function(components, status, jqXHR) {
          self.set('components', components);  
        }
      });
    },

    setMission: function(index) {

    },

    save: function() {
      console.log('SAVING...');
    },

    load: function() {
      console.log('LOADING...');
    },

    addComponent: function(com) {
      var configuration = this.get('configuration');
      configuration.push(com);
      this.set('configuration', configuration);
    },

    calculateStats: function(cb) {
      var self = this;
      var conf = this.get('configuration');
      console.log(conf);
      return $.ajax({
        url: '/evaluate-values',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(conf),
        success: function(data, status, jqXHR) {
          self.trigger('stats', data);
          return cb && cb(null, data);
        }
      });
    }

  });

  return AppModel;

});
