(function(global) {
    var version = '0.1.alpha';

    requirejs.config({
        baseUrl: "./",
        paths: {
            'jquery':           'assets/js/jquery-1.11.2.min',
            'foundation':       'assets/js/foundation/foundation.min',
            'underscore':       'assets/js/underscore-min',
            'backbone':         'assets/js/backbone-min',
            'template':         'assets/js/template',
            'xploration.app':   'views/xploration.app',
            'vidbg':            'assets/js/vidbg.min'
        },
        shim: {
            'foundation': {
                deps: ['jquery']
            },
            'backbone': {
                deps: ['jquery', 'underscore']
            },
            'template': {
                deps: ['jquery', 'underscore', 'backbone']
            },
            'xploration.app': {
                deps: ['jquery', 'foundation', 'backbone', 'underscore', 'vidbg']
            },
        },
        urlArgs: "version=" + version
    });

    /* App initialize */
    requirejs(['xploration.app'], function(App) {
        var app = global['app'] = new App();
    });
})(window);