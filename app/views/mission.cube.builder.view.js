define(['jquery', 'underscore', 'template!mission.cube.builder'], function($, _, TPL_mission_builder) {

    var XplorationApp = Backbone.View.extend({
        className: 'mission-cube-builder view',
        id: 'mission-builder',
        initialize: function() {
            var self = this;
            return Backbone.View.prototype.initialize.apply(self, arguments);
        },
        render: function(parameters) {
          var self = this;
          self.markup = TPL_mission_builder(parameters);

          self.$el.html(self.markup);

          Backbone.View.prototype.render.apply(self, arguments);

          return self;
        }
    });

    return XplorationApp;
});
