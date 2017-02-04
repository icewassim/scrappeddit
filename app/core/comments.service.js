(function () {
  "use strict";

  angular
    .module("app.core")
    .constant("COMMENT_CONFIG", {
        MIN_FONT_SIZE: 20,
        PLACEMENT: {
            BOTTOM: "bottom",
            TOP: "top",
            RIGHT: "right",
            LEFT: "left"
        },
        DEFAULT_SCORE: {
            "MAX": 1000,
            "MIN": 0
        },
        AVATARS_LENGTH: 23,
        FAV_COLORS: [[0, 153, 255], [231, 110, 68], [140, 234, 201], [37, 162, 60], [215, 141, 8], [153, 235, 40], [228, 233, 85], [39, 54, 231], [223, 133, 221], [212, 123, 94], [245, 239, 212], [229, 168, 48], [245, 21, 122], [208, 98, 32], [238, 235, 226]]
    })
    .service("commentsService", ["COMMENT_CONFIG", "$timeout", commentsService]);

  function commentsService(COMMENT_CONFIG, $timeout) {
      this.hoveredComment =  {};
      this.modalComment = {};
      this.hoverTimeout;

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
          };

          this.hoveredComment.element = element;
      }

      function setHoverTimeout(_hoverTimeout_) {
          this.hoverTimeout = _hoverTimeout_;
      }

      function clearHoverTimeout() {
          $timeout.cancel(this.hoverTimeout);
      }

      function getHoveredComment() {
          return this.hoveredComment;
      }

      function randomizeComments(data) {
        var globalScore = {
                minScore: COMMENT_CONFIG.MAX || data[data.length -1 ].score,
                maxScore: COMMENT_CONFIG.MIN || data[0].score
            }

        return data.map(function(comment) {
            return angular.extend(comment, {
                 color: _genRandomColor(),
                 position: _genRandomPosition(),
                 font: _genRandomFont(),
                 rotation: _genRandomRotation(),
                 width: _getRandomWidth(),
                 date: timeDifference(new Date(), new Date(comment.created * 1000)),
                 replies: comment.replies,
                 avatar: genRandomAvatar(),
                 fontSize: _getFontSize(comment.score, this.maxScore, this.minScore, comment.body.length) + COMMENT_CONFIG.MIN_FONT_SIZE
             })
         }.bind(globalScore));
     }


    function getPopupCoordinates(commentPosition, commentOffset , commentSize) {
          var placement = "",
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
                  left: commentOffset.left - commentSize.width/2 - 220
              };
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


      function genRandomAvatar(){
          return _rand(COMMENT_CONFIG.AVATARS_LENGTH, 1);
      }

      function _genRandomFont() {
          var randIndex,
          fontsArray = ["ArchitectsDaughter", "billy","REIS-Regular", "danielbk", "DiamondsPearls", "FAIL____", "GoodDog", "HappyFox-Condensed", "JennaSue", "Ludicrous", "LSTKGarPenTin", "OwnThatShhhh", "pops_08_BOLD", "Sketch_Block", "whatever_it_takes", "stay_writer"];

          randIndex = _rand(fontsArray.length);
          return fontsArray[randIndex];
      }

      function _genRandomColor() {
          var idx = _rand(COMMENT_CONFIG.FAV_COLORS.length);
          return {
              r: COMMENT_CONFIG.FAV_COLORS[idx][0],
              g: COMMENT_CONFIG.FAV_COLORS[idx][1],
              b: COMMENT_CONFIG.FAV_COLORS[idx][2]
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

      function _genRandomRotation() {
          return _rand(10, -5);
      }

      function _getFontSize(commentScore, maxScore, minScore, bodyLength) {
          return (commentScore - minScore) / (maxScore - minScore) * 50 * (1/bodyLength);
      }

      function _rand(max, min) {
          return parseInt(Math.random()*max + (min || 0));
      }


      function timeDifference(current, previous) {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = current - previous;

        if (elapsed < msPerMinute) {
             return Math.round(elapsed/1000) + " seconds ago";
        }

        else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + " minutes ago";
        }

        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + " hours ago";
        }

        else if (elapsed < msPerMonth) {
            return  Math.round(elapsed/msPerDay) + " days ago";
        }

        else if (elapsed < msPerYear) {
            return  Math.round(elapsed/msPerMonth) + " months ago";
        }

        else {
            return  Math.round(elapsed/msPerYear ) + " years ago";
        }
    }

    function setModalComment(comment, replie) {
        this.modalComment= comment;
    }

    function getModalComment() {
        return this.modalComment;
    }

      return {
          getPopupCoordinates: getPopupCoordinates,
          randomizeComments: randomizeComments,
          setHoveredComment: setHoveredComment,
          setHoverTimeout: setHoverTimeout,
          clearHoverTimeout: clearHoverTimeout,
          getHoveredComment: getHoveredComment,
          setModalComment: setModalComment,
          timeDifference: timeDifference,
          getModalComment: getModalComment,
          genRandomAvatar: genRandomAvatar
      };
  }
}());
