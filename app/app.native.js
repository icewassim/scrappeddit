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
                .otherwise("/r/AskReddit/comments/5aih71/which_movie_would_be_boring_if_its_plot_is/");
/*
            $locationProvider.html5Mode({
                enabled: true
            });
*/
        }
    ]);
