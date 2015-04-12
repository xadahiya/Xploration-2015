define([
  'jquery', 
  'underscore', 
  'backbone',
  'json!missions',
  'json!../components'
], function($, _, Backbone, missions, components) {

  var AppModel = Backbone.Model.extend({
    
    initialize: function() {
      Backbone.Model.prototype.initialize.apply(this, arguments);
      this.set('missions', missions);
      this.set('components', components);
    },

    setMission: function(index) {

    },

    save: function() {
      console.log('SAVING...');
    },

    load: function() {
      console.log('LOADING...');
    },

    calculateStats: function(cb) {
      return cb(null, {
        cost: 5000,
        term: {curr: 10, max: 12},
        weight: {curr: 10, max: 12},
        volume: {curr: 10, max: 12},
        power: {curr: 10, max: 12}
      });
    }

  });

  return AppModel;

});
