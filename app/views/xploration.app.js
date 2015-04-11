define([
    'jquery',
    'underscore',
    'vidbg',
    'views/mission.selector.view',
    'views/mission.builder.view',
    'views/mission.deploy.view',
    'views/mission.launch.view',
    'models/app.model'

], function($, _, vidbg, missionSelector, missionBuilder, missionDeploy, missionLaunch, AppModel) {

    var XplorationApp = Backbone.View.extend({
        className: 'xploration-app',
        id: 'pramanta-xploration-space-app-2015',
        model: new AppModel(),
        initialize: function() {
            var self = this;

            self.setupVideo();
            var self = window.app = this;
            var msv = new missionSelector();
            var mbv = new missionBuilder();

            self['views'] = {
                missionSelector: msv,
                missionBuilder: mbv
            };

            self.$el.prependTo($('body'));

            self.render();

            var self = window.app = this;
            self.setupVideo();

        	var msv = new missionSelector({model: this.model});
            var mbv = new missionBuilder({model: this.model});
            var mdv = new missionDeploy({model: this.model});
            var mlv = new missionLaunch({model: this.model});

        	self['views'] = {
        		missionSelector: msv,
                missionBuilder: mbv,
                missionDeploy: mdv,
                missionLaunch: mlv
        	};

            self.$el.prependTo($('body'));
        	self.render();

            return Backbone.View.prototype.initialize.apply(self, arguments);
        },
        setupVideo: function() {
            var self = this;
            vidbg(self.el, [{
                src: 'assets/video/earth.mp4',
                type: 'mp4'
            }, {
                src: 'assets/video/earth.ogv',
                type: 'ogg'
            }, {
                src: 'assets/video/earth.webm',
                type: 'webm'
            }], true);

            self.checkReadyState();
        },
        checkReadyState: function() {
            var self = this;
            if (_.isUndefined(self.video) || _.isNull(self.video)) {
                self['video'] = self.$el.find('video').get(0);
                setTimeout(function(){self.checkReadyState();},250);
            } else {
                if(self.video.readyState === 4) {
                    self.enterApp();
                } else {
                    setTimeout(function(){self.checkReadyState();},250);
                }
            }
        },
        render: function(opts) {
            Backbone.View.prototype.render.apply(self, arguments);

            opts = opts || {};
            opts.view = opts.view || 'missionSelector';
            var self = this;

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

            return self;
        },
        enterApp: function() {
            $('#preloader').delay(1000).fadeOut(500, function() {
                $(this).remove();
                $('body').addClass('ready');
                $('.vidbg').addClass('show');
                $('.xploration-app').fadeIn(250);
            });
            this.show(opts);

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
