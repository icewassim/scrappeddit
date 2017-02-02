(function(){
    "use strict";

    angular
        .module("app.core")
        .constant("BOARD_CONFIG",{
            MASONRY: {
                "COLUMN_SIZE": 5,
            }
        })
        .controller("boardController", ["$scope","$routeParams", "subredditService", "commentsService", "BOARD_CONFIG", boardController]);

    function boardController($scope, $routeParams, subredditService, commentsService, BOARD_CONFIG) {
        var boardCtrl = this;

        boardCtrl.comments = [];
        function init() {
            subredditService.getPosts($routeParams.subreddit, $routeParams.threadId)
                .then(function(data) {
                    boardCtrl.comments = commentsService.randomizeComments(data);
                });
            }

        init();

        // TODO: rplace with dom is ready
        setTimeout(function(){
            // requirejs([
            //   "app/libs/isotope.pkgd",
            // ], function( Isotope ) {
                var iso  = new Isotope(".grid",{
                      itemSelector: ".grid-item",
                      percentPosition: true,
                      masonry: {
                          columnWidth: BOARD_CONFIG.MASONRY.COLUMN_SIZE
                      }
                  });
            //    iso();
            // });

        }, 6000);
      }
}());
