'use strict';

require([
    'jQuery',
	'angular',
], function (jQuery, angular) {
    require([
        'app/core/core.module',
        'app/components/components.module',
        'app/components/comment/comment.directive',
        'app/components/popup/popup.directive',
        'app/core/subreddit.service',
		'app/core/comments.service',
        'app/core/board.controller',
    ], function() {
        angular
            .module('app', [
                    'app.core',
					'app.components'
            ])

        angular.bootstrap(document, ['app']);
    });
});
