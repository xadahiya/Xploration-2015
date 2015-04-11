define(['jquery', 'underscore', 'vidbg', 'views/mission.selector.view', 'views/mission.builder.view'], function($, _, vidbg, missionSelector, missionBuilder) {

    var XplorationApp = Backbone.View.extend({
        className: 'xploration-app',
        id: 'pramanta-xploration-space-app-2015',
        initialize: function() {
            var self = window.app = this;
            self.setupVideo();

        	var msv = new missionSelector();
            var mbv = new missionBuilder();

        	self['views'] = {
        		missionSelector: msv,
                missionBuilder: mbv
        	};

            self.$el.prependTo($('body'));


        	self.render();

            return Backbone.View.prototype.initialize.apply(self, arguments);
        },
        setupVideo: function() {
            var self = this;
            vidbg(self.el, [{
                src: 'assets/video/earth.mov',
                type: 'mov'
            }], true);

            self.checkReadyState();
        },
        checkReadyState: function() {
            var self = this;
            var video = self.$el.find('video').get(0);

        },
        render: function(opts) {
            Backbone.View.prototype.render.apply(self, arguments);
            this.show(opts);
        	$('#preloader').delay(1000).fadeOut(500, function(){
        		$(this).remove();
        		$('body').addClass('ready');
        	});
        	return self;
        },
        show: function(opts) {
            opts           = opts || {};
            opts.view      = opts.view || 'missionSelector';
            var renderView = this.views[opts.view];
            if (this.activeView) {
                this.activeView.$el.detach();
                this.activeView = null;
            }
            if (renderView) {
                renderView.render().$el.appendTo(this.el);
                this.activeView = renderView;
            }
            return this;
        }
    });

    return XplorationApp;
});
