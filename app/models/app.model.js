define([
  'jquery', 
  'underscore', 
  'backbone',
  'json!missions'
], function($, _, Backbone, missions) {

  var AppModel = Backbone.Model.extend({
    
    initialize: function() {
      Backbone.Model.prototype.initialize.apply(this, arguments);
      this.set('missions', missions);
    },

    save: function() {
      console.log('SAVING...');
    },

    load: function() {
      console.log('LOADING...');
    }

  });

  return AppModel;

});
