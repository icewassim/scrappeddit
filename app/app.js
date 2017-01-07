"use strict";

require([
    "jQuery",
	"angular",
    "angularRoute"
], function (jQuery, angular) {
    require([
        "app/core/core.module",
        "app/components/components.module",
        "app/components/comment/comment.directive",
        "app/components/popup/popup.directive",
        "app/core/subreddit.service",
		"app/core/comments.service",
        "app/core/board.controller",
    ], function() {
        angular
            .module("app", [
                    "ngRoute",
                    "app.core",
					"app.components"
            ])
            .config(["$locationProvider", "$routeProvider",
                function config($locationProvider, $routeProvider) {
                    $routeProvider.
                        when("/r/:subreddit/comments/:threadId/:title/", {
                            templateUrl: "app/core/core-view.html"
                        })
                        .otherwise("/r/AskReddit/comments/5aih71/which_movie_would_be_boring_if_its_plot_is/")

                }
            ])

        angular.bootstrap(document, ["app"]);
    });
});
