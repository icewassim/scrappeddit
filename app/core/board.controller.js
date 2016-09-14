(function(){
  'use strict';
  var boardController = function($scope, subredditService) {

    var comments = [];
    function init() {
       subredditService.getPosts("/r/hello")
       .then(function(data) {
         comments = data;
         console.log(data);
        });
      }

    function _randomizeComments(){
      return Object.assign(comment, {
        color: _getRandomColor()
      });
    }

    function _getRandomColor(){
      return {
        r: Math.random()*255,
        g: Math.random()*255,
        b: Math.random()*255,
        a: 1,
      };
    }

    angular.extend(this, {
      comments: comments
    });

    init();
  }

  angular
    .module('app.core')
    .controller('boardController', boardController);
}());
