(function(){
  "use strict";

  angular
    .module("app.components")
    .directive("commentSubreddit", [ "$timeout", "commentsService", commentSubreddit]);

  function commentSubreddit( $timeout, commentsService) {
    return {
        restrict: "E",
        replace: true,
        scope:{
            comment: "=",
            mouseenterComment: "&",
        },
        templateUrl: "app/components/comment/comment.html",
        link: function(scope, element) {
            scope.onEnter = function (comment) {
                var hoverTimeout;
                commentsService.clearHoverTimeout();
                hoverTimeout = $timeout(function(){
                    scope.mouseenterComment({comment:commentsService.extendHoveredComment(this.comment, this.element)})
                }.bind({
                    comment:comment,
                    element: this
                }), 500);

                commentsService.setHoverTimeout(hoverTimeout);
            }.bind(element);
        },
    };
  }
})();
