define(['jquery', 'underscore', 'template!mission.cube.builder', 'foundation-offcanvas'], function($, _, TPL_mission_builder) {

    var XplorationApp = Backbone.View.extend({
        className: 'mission-cube-builder view',
        id: 'mission-builder',
        events: {
            'change #ul-selector': 'onChangeSelector',
            'click #launch-button': 'onClickLaunch'
        },
        initialize: function() {
            var self = this;
            return Backbone.View.prototype.initialize.apply(self, arguments);
        },
        render: function(parameters) {
            var self = this;

            self.markup = TPL_mission_builder({
                model: this.model,
                name: this.model.get('user-fullname'),
                mission: this.model.get('mission'),
                components: _.groupBy(this.model.get('components'), function mapComponent(comp) {
                    return comp.object.category.replace(/\ /g, '-');
                })
            });
            self.$el.html(self.markup);
            Backbone.View.prototype.render.apply(self, arguments);
            return self;
        },
        onChangeSelector: function(ev) {
            var value = $(ev.currentTarget).val();
            this.$el.find('.component-list').hide();
            this.$el.find(value).show();
        },
        onClickLaunch: function(ev) {
            window.app.show('missionDeploy');
        }
    });

    return XplorationApp;
});
