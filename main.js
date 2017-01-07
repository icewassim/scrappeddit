'use strict';

require.config({
	paths: {
		jQuery: '//code.jquery.com/jquery-2.2.4.min',
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
