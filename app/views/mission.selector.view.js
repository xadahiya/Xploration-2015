define(['jquery', 'underscore', 'template!mission.selector'], function($, _, TPL_mission_selector) {

    var XplorationApp = Backbone.View.extend({
        className: 'mission-selector view',
        id: 'mission-selector',
        events: {
            'click #go-btn': 'onClickGoBtn'
        },
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
        },
        onClickGoBtn: function(ev) {
            var missionId = $('#mission-id-input').val();
            var fullName  = $('#user-fullname-input').val();
            var mission   = this.model.get('missions')[missionId];
            if (!mission) {
                throw new Error('NO SUCH MISSION, YOU IDIOT!');
            }
            this.model.set('active-mission', mission);
            this.model.set('user-fullname', fullName);
            window.app.show('missionBuilder');
        }
    });

    return XplorationApp;
});
