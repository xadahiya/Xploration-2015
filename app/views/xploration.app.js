define(['jquery', 'underscore', 'views/mission.selector.view'], function($, _,  missionSelector) {

    var XplorationApp = Backbone.View.extend({
        className: 'xploration-app',
        id: 'pramanta-xploration-space-app-2015',
        initialize: function() {
        	var self = this;
        	var msv = new missionSelector();

        	self['views'] = {
        		missionSelector: msv
        	};

        	self.render();

        	return Backbone.View.prototype.initialize.apply(self, arguments);
        },
        render: function() {
        	var self = this;

        	var markup = self.views.missionSelector.render();

        	self.$el.append( markup );


        	$("body").prepend(self.$el)
        	$('#preloader').delay(500).fadeOut(500, function(){
        		$(this).remove();
        		$("body").addClass('ready');
        	});

        	return Backbone.View.prototype.render.apply(self, arguments);
        }
    });

    return XplorationApp;
});