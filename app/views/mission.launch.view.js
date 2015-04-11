define(['jquery', 'underscore', 'template!mission.launch'], function($, _, TPL_mission_launch) {

    var XplorationApp = Backbone.View.extend({
        className: 'mission-launch view',
        id: 'mission-launch',
        initialize: function() {
            var self = this;
            return Backbone.View.prototype.initialize.apply(self, arguments);
        },
        render: function(parameters) {
          var self = this;
            self.markup = TPL_mission_launch(parameters);

            self.$el.html(self.markup);

            Backbone.View.prototype.render.apply(self, arguments);

            return self;
        }
    });

    return XplorationApp;
});
