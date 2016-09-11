(function(){
  'use strict';
  var boardController = function($scope, subredditService) {
    this.comments = ["aa"];

    function initBoard() {
       subredditService.getPosts("hello").then(function(data){
         console.log(data[1])
        this.comments = data;
      }.bind(this));
    }

    initBoard.bind(this)();
  }

  angular.module('app.core').controller('boardController', boardController);
}());
