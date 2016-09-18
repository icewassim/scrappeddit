(function(){
  'use strict';

  var boardController = function() {
    var boardCtrl = this;

    function init() {
      subredditService.getPosts("/r/hello")
      .then(function(data) {
        boardCtrl.comments = data.map(_randomizeComments)
      });
    };

    function _randomizeComments(comment) {
      return angular.extend(comment, {
        color: _genRandomColor(),
        position: _genRandomPosition(),
        font: _genRandomFont(),
        rotation: _genRandomRotation()
      });
    }

    function _genRandomFont() {
      var randIndex,
          fontsArray = ["ArchitectsDaughter", "billy", "BrookeS8", "comesinhandy", "danielbk", "danielbk.1", "DiamondsPearls", "FAIL____", "fonts.txt", "GoodDog.otf", "HappyFox-Condensed.otf", "JennaSue", "Linny", "LSTKGarPenTin.otf", "OwnThatShhhh", "pops_08_BOLD", "Sketch_Block", "the_quiet_scream"];

      randIndex = parseInt(Math.random()*fontsArray.length);
      return fontsArray[randIndex];
    }

    function _genRandomColor() {
      return {
        r: parseInt(Math.random()*255),
        g: parseInt(Math.random()*255),
        b: parseInt(Math.random()*255)
      };
    }

    function _genRandomPosition() {
      return {
        x: parseInt(Math.random()*100),
        y: parseInt(Math.random()*100)
      };
    }

    function _genRandomRotation(argument) {
      return parseInt(Math.random()*90) - 45;
    }

    function _genFontSize(score, minScore, MaxScore) {

    }

    init();
  };

  boardController.$inject = ['$scope', 'subredditService'];

  angular
    .module('app.core')
    .controller('boardController', boardController);
}());
