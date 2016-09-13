(function(){
  'use strict';

  var commentSubreddit = function() {
    return {
      restrict: "E",
      templateUrl: "components/comment/comment.html"
    };
  }
  angular
    .module('app.components')
    .directive("commentSubreddit", commentSubreddit);
})();
