define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
	var cache = {};
	return {
		load: function(name, req, onload, config) {
			if (cache[name]) { return onload(cache[name]); }
			return Backbone.ajax({
				url: 'templates/' + name + '.html?bust=' + Date.now(),
				success: function(data, status, jqXHR) {
					var tmplFn = _.template(data);
					cache[name] = tmplFn;
					return onload(tmplFn);
				},
				error: function(jqXHR, status, err) {
					return onload.error({ message: err || status });
				}
			});
		}
	};
});



