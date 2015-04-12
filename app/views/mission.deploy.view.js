define(['jquery', 'underscore', 'template!mission.deploy'], function($, _, TPL_mission_deploy) {

    var XplorationApp = Backbone.View.extend({
        className: 'mission-deploy view',
        id: 'mission-deploy',
        initialize: function() {
            var self = this;
            return Backbone.View.prototype.initialize.apply(self, arguments);
        },
        render: function(parameters) {
          var self = this;
          self.markup = TPL_mission_deploy(parameters);
          self.$el.html(self.markup);
          Backbone.View.prototype.render.apply(self, arguments);
          return self;
        }
    });

    return XplorationApp;
});
