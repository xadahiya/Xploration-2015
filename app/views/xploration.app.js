define(['jquery', 'underscore', 'vidbg', 'views/mission.selector.view'], function($, _, vidbg, missionSelector) {

    var XplorationApp = Backbone.View.extend({
        className: 'xploration-app',
        id: 'pramanta-xploration-space-app-2015',
        initialize: function() {
            var self = this;
            var msv = new missionSelector();

            self.prepareVideo();

            self['views'] = {
                missionSelector: msv
            };

            self.render();

            return Backbone.View.prototype.initialize.apply(self, arguments);
        },
        prepareVideo: function() {
            var self = this;
            vidbg(self.el, [{
                src: 'assets/video/earth.mov',
                type: 'mov'
            }], true);
        },
        render: function() {
            var self = this;

            var markup = self.views.missionSelector.render();

            self.$el.append(markup);


            $("body").prepend(self.$el)
            $('#preloader').delay(1000).fadeOut(500, function() {
                $(this).remove();
                $("body").addClass('ready');
            });

            return Backbone.View.prototype.render.apply(self, arguments);
        }
    });

    return XplorationApp;
});
