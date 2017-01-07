(function(){
  "use strict";

  angular
    .module("app.components")
    .directive("commentSubreddit", ["commentsService", commentSubreddit]);

  function commentSubreddit(commentsService) {
    return {
        restrict: 'E',
        replace: true,
        scope:{
            comment: '='
        },
        templateUrl: "app/components/comment/comment.html",
        link: function(scope, element) {
            scope.onHover = function (comment) {
                commentsService.setHoveredComment(comment, this);
            }.bind(element);
        },
    };
  }
})();
