define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

  var AppModel = Backbone.Model.extend({
    
    save: function() {
      console.log('SAVING...');
    },

    load: function() {
      console.log('LOADING...');
    }

  });

  return AppModel;
  
});
