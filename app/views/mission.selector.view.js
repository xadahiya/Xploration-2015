define(['jquery', 'underscore', 'template!mission.selector'], function($, _, TPL_mission_selector) {

    var XplorationApp = Backbone.View.extend({
        className: 'mission-selector view',
        id: 'mission-selector',
        initialize: function() {
            var self = this;
            return Backbone.View.prototype.initialize.apply(self, arguments);
        },
        render: function(parameters) {
            var self = this;
            
            self.markup = TPL_mission_selector({model: this.model});

            self.$el.html(self.markup);
            
            Backbone.View.prototype.render.apply(self, arguments);

            return self;
        }
    });

    return XplorationApp;
});
