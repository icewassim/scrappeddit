(function(){
    'use strict';

    angular
        .module('app.core')
        .constant('BOARD_CONFIG',{
            MASONRY: {
                'COLUMN_SIZE': 5,
            }
        })
        .controller('boardController', ['$scope', 'subredditService', 'commentsService', 'BOARD_CONFIG', boardController]);

    function boardController($scope, subredditService, commentsService, BOARD_CONFIG) {
        var boardCtrl = this;

        function init() {
            subredditService.getPosts("/r/hello")
                .then(function(data) {
                    boardCtrl.comments = commentsService.randomizeComments(data);
                });
            };

        init();

        // TODO: rplace with dom is ready
        setTimeout(function(){
            $('.grid').isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                  columnWidth: BOARD_CONFIG.MASONRY.COLUMN_SIZE
                }
              });
        }, 6000);
      };
}());
