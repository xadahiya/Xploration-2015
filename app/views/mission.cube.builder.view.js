define(['jquery', 'underscore', 'template!mission.cube.builder', 'foundation-offcanvas'], function($, _, TPL_mission_builder) {

    var XplorationApp = Backbone.View.extend({
        className: 'mission-cube-builder view',
        id: 'mission-builder',
        initialize: function() {
            var self = this;
            return Backbone.View.prototype.initialize.apply(self, arguments);
        },
        render: function(parameters) {
            var self = this;
            self.markup = TPL_mission_builder({
                model: this.model,
                name: this.model.get('user-fullname'),
                mission: this.model.get('mission')
            });
            self.$el.html(self.markup);
            self.$el.find('#ul-selector').on('change', function onChange(ev) {
                alert('ciao');
            });
            Backbone.View.prototype.render.apply(self, arguments);
            return self;
        },
        onChangeSelector: function(ev) {
            alert('ciao');

        }
    });

    return XplorationApp;
});
