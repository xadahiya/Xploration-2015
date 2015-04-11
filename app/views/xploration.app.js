define(['jquery', 'underscore', 'vidbg', 'views/mission.selector.view', 'views/mission.builder.view'], function($, _, vidbg, missionSelector, missionBuilder) {

    var XplorationApp = Backbone.View.extend({
        className: 'xploration-app',
        id: 'pramanta-xploration-space-app-2015',
        initialize: function() {

        	var self = window.app = this;
        	var msv = new missionSelector();
            var mbv = new missionBuilder();

        	self['views'] = {
        		missionSelector: msv,
                missionBuilder: mbv
        	};

            self.$el.prependTo($('body'));

            self.prepareVideo();
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

        render: function(opts) {

            Backbone.View.prototype.render.apply(self, arguments);
            console.log(opts);
            opts      = opts || {};
            opts.view = opts.view || 'missionSelector';
        	var self  = this;

            var renderView = self.views[opts.view];

            console.log(renderView);

            if (self.activeView) {
                self.activeView.$el.detach();
                self.activeView = null;
            }

            if (renderView) {
                renderView.render().$el.appendTo(self.el);
                self.activeView = renderView;
            }

        	$('#preloader').delay(1000).fadeOut(500, function(){
        		$(this).remove();
        		$('body').addClass('ready');
        	});

        	return self;
        }
    });

    return XplorationApp;
});
