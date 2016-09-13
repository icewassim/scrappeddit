(function(){
  'use strict';
  var boardController = function($scope, subredditService) {

    var comments = [];
    function init() {
       subredditService.getPosts("/r/hello")
       .then(function(data) {
         comments = data;
         console.log("2");
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

    init();
    debugger;
    angular.extend(this, {
      comments: comments
    });
    console.log("1");

    comments.push({a:1})
  }

  angular
    .module('app.core')
    .controller('boardController', boardController);
}());
