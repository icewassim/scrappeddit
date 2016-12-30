'use strict';

require.config({
	paths: {
		jQuery: 'bower_components/jquery/dist/jquery.min',
        angular: 'bower_components/angular/angular'
	},
	shim: {
		jQuery:{
			exports: 'jQuery'
		},
		angular: {
			exports: 'angular'
		}
	},
	deps: ['app/app']
});
