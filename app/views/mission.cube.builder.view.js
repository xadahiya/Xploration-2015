define([
    'jquery', 
    'underscore', 
    'template!mission.cube.builder',
    'template!mission.cube.stats',
    'foundation-offcanvas'
], function($, _, TPL_mission_builder, TPL_mission_stats) {

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
            self.loadStats();
            return self;
        },
        onChangeSelector: function(ev) {
            var value = $(ev.currentTarget).val();
            this.$el.find('.component-list').hide();
            this.$el.find(value).show();
        },
        onClickLaunch: function(ev) {
            window.app.show('missionDeploy');
        },
        loadStats: function() {
            var self = this;
            self.model.calculateStats(function onStats(err, stats) {
                if (err) { return alert('error'); }
                self.$el.find('.recap').html(TPL_mission_stats(stats));
            });
        }
    });

    return XplorationApp;
});
