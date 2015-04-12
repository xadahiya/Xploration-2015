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
            var self = this;
            var missionId = $('#mission-id-input').val();
            var fullName  = $('#user-fullname-input').val();
            var mission   = this.model.get('missions')[missionId];
            if (!mission) {
                throw new Error('NO SUCH MISSION, YOU IDIOT!');
            }
            if (!fullName || fullName.length < 2) {
                return alert('Insert your full name, please.');
            }
            this.model.set('mission', mission);
            this.model.set('user-fullname', fullName);
            window.app.show('missionCubeBuilder');
            $(document).foundation({
                offcanvas: {
                    // Sets method in which offcanvas opens.
                    // [ move | overlap_single | overlap ]
                    open_method: 'move',
                    // Should the menu close when a menu link is clicked?
                    // [ true | false ]
                    close_on_click: false
                }
            });
            setTimeout(function(){ $('section.cubesat').addClass('show'); }, 500);
        }
    });

    return XplorationApp;
});
