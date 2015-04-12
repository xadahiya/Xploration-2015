(function(global) {
    var version = '0.1.alpha';

    requirejs.config({
        baseUrl: "./",
        paths: {
            'jquery': 'assets/js/jquery-1.11.2.min',
            'jquery-ui': 'assets/js/jquery-ui.min',
            'foundation': 'assets/js/foundation.min',
            'foundation-dropdown': 'assets/js/foundation/foundation.dropdown',
            'foundation-offcanvas': 'assets/js/foundation/foundation.offcanvas',
            'underscore': 'assets/js/underscore-min',
            'backbone': 'assets/js/backbone-min',
            'template': 'assets/js/template',
            'json': 'assets/js/json',
            'xploration.app': 'views/xploration.app',
            'vidbg': 'assets/js/vidbg.min'
        },
        shim: {
            'jquery-ui': {
                deps: ['jquery']
            },
            'foundation': {
                deps: ['jquery']
            },
            'foundation-offcanvas': {
                deps: ['foundation']
            },
            'foundation-dropdown': {
                deps: ['foundation']
            },
            'backbone': {
                deps: ['jquery', 'underscore']
            },
            'template': {
                deps: ['jquery', 'underscore', 'backbone']
            },
            'xploration.app': {
                deps: ['jquery', 'underscore', 'backbone', 'foundation', 'vidbg', 'foundation-dropdown', 'foundation-offcanvas']
            },
        },
        urlArgs: "version=" + version
    });

    /* App initialize */
    requirejs(['xploration.app'], function(App)  {
        var app = global['app'] = new App();
    });
})(window);
