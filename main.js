'use strict';

require.config({
	paths: {
		jQuery: 'bower_components/jquery/dist/jquery.min',
        angular: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular',
		angularRoute: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-route.min'
	},
	shim: {
		'jQuery':{
			'exports': 'jQuery'
		},
		'angular': {
			'exports': 'angular'
		},
		'angularRoute': ['angular'],
	},
	deps: ['app/app']
});
