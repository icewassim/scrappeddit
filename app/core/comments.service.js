(function () {
  'use strict';

  angular
    .module('app.core')
    .constant('COMMENT_CONFIG', {
        MIN_FONT_SIZE: 20,
        PLACEMENT: {
            BOTTOM: 'bottom',
            TOP: 'top',
            RIGHT: 'right',
            LEFT: 'left'
        },
        DEFAULT_SCORE: {
            'MAX': 1000,
            'MIN': 0
        },
    })
    .service('commentsService', ['COMMENT_CONFIG', commentsService]);

  function commentsService(COMMENT_CONFIG) {
      this.hoveredComment =  {};

      function setHoveredComment(comment, element) {
          this.hoveredComment = comment;
          this.hoveredComment.position = {
              top:  (element.position().top / window.innerHeight) * 100,
              left: (element.position().left / window.innerWidth) * 100,
          };

          this.hoveredComment.offset = {
              top : element.offset().top,
              left: element.offset().left,
          };

          this.hoveredComment.size = {
              width: element.width() ,
              height: element.height(),
          }
      }

      function getHoveredComment() {
          return this.hoveredComment;
      }

      function randomizeComments(data) {
        var sortedByScore = data.sort(_sortByScore),
            globalScore = {
                maxScore: COMMENT_CONFIG.MAX || sortedByScore[data.length -1 ].score,
                minScore: COMMENT_CONFIG.MIN || sortedByScore[0].score
            }

        return data.map(function(comment) {
            return angular.extend(comment, {
                color: _genRandomColor(),
                 position: _genRandomPosition(),
                 font: _genRandomFont(),
                 rotation: _genRandomRotation(),
                 width: _getRandomWidth(),
                 fontSize: _getFontSize(comment.score, this.maxScore, this.minScore) + COMMENT_CONFIG.MIN_FONT_SIZE
             })
         }.bind(globalScore));
     }


    function getPopupCoordinates(commentPosition, commentOffset , commentSize) {
          var placement = '',
              position = {};

          if(!commentPosition || !commentOffset || !commentSize) {
              return false;
          }

          if(commentPosition.top < 25) {
              placement = COMMENT_CONFIG.PLACEMENT.BOTTOM;
              position = {
                  top: commentOffset.top + 25,
                  left:commentOffset.left - 150 + commentSize.width /2
              }
          }else {
              placement = COMMENT_CONFIG.PLACEMENT.TOP;
              position = {
                  top: commentOffset.top - 150,
                  left: commentOffset.left - 150 + commentSize.width/2
              }
          }

          if(commentPosition.left < 10) {
              placement = COMMENT_CONFIG.PLACEMENT.RIGHT;
              position = {
                  top: commentOffset.top - 50,
                  left: commentOffset.left + commentSize.width
              }
          }

          if(commentPosition.left > 70) {
              placement = COMMENT_CONFIG.PLACEMENT.LEFT;
              position = {
                  top: commentOffset.top - 50,
                  left: commentOffset.left - commentSize.width - 220
              }
          }

          return {
              position: position,
              placement: placement
          }
      }

      //TODO cmon ?!
      function _sortByScore(a,b) {
          return a.score - b.score;
      }

      function _genRandomFont() {
          var randIndex,
          fontsArray = ["ArchitectsDaughter", "billy","REIS-Regular", "danielbk", "DiamondsPearls", "FAIL____", "GoodDog", "HappyFox-Condensed", "JennaSue", "Ludicrous", "LSTKGarPenTin", "OwnThatShhhh", "pops_08_BOLD", "Sketch_Block", "whatever_it_takes", "stay_writer"];

          randIndex = _rand(fontsArray.length);
          return fontsArray[randIndex];
      }

      function _genRandomColor() {
          return {
              r: _rand(255),
              g: _rand(255),
              b: _rand(255)
          };
      }

      function _genRandomPosition() {
          return {
              x: _rand(100),
              y: _rand(100)
          };
      }

      function _getRandomWidth() {
          return _rand(300, 150);
      }

      function _getRandomFontsize() {
          return _rand(20, 10);
      }

      function _genRandomRotation(argument) {
          return _rand(10, -5);
      }

      function _getFontSize(commentScore, maxScore, minScore) {
          return (commentScore - minScore) / (maxScore - minScore) * 50;
      }

      function _rand(max, min) {
          return parseInt(Math.random()*max + (min || 0));
      }

      return {
          getPopupCoordinates: getPopupCoordinates,
          randomizeComments: randomizeComments,
          setHoveredComment: setHoveredComment,
          getHoveredComment: getHoveredComment,
      };
  }
}());
