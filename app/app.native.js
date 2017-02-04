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
                    templateUrl: "/scrappeddit/app/core/core-view.html"
                })
                .otherwise("/r/AskReddit/comments/5s01t3/serious_what_keeps_you_from_falling_into_the/");
/*
            $locationProvider.html5Mode({
                enabled: true
            });
*/
        }
    ]);
