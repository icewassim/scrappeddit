(function(){
  'use strict';

  var commentSubreddit = function() {
    return {
      restrict: "E",
      scope:{
        comment: "="
      },
      templateUrl: "components/comment/comment.html",
      controllerAs: 'vm',
    };
  }
  angular
    .module('app.components')
    .directive("commentSubreddit", commentSubreddit);
})();
