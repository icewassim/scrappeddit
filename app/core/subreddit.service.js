(function () {
  "use strict";

  angular
    .module("app.core")
    .factory("subredditService", ["$http", subredditService]);

   function subredditService($http) {
    function _mapSubData(child) {
      return {
        author:child.data.author,
        created:child.data.created_utc,
        edited:child.data.edited,
        score:child.data.score,
        ups:child.data.ups,
        replies:  child.data.replies && child.data.replies.data && child.data.replies.data.children,
        body:child.data.body
      }
    }

    function formatSubredditUrl(subredditId, threadId) {
        var baseURL = "https://api.reddit.com/r/";
        //var baseURL =  https://api.reddit.com/r/AskReddit/comments/5aih71
        return baseURL + subredditId + "/comments/"+ threadId +".json";
    }

    function filterEmptyData(comment) {
          return !!comment.data.body;
    }

    var getPosts = function(subredditId, threadId) {
      return $http.get(formatSubredditUrl(subredditId, threadId))
                  .then(function(result){
        try{
          if(!result.data || result.data.length !== 2 || !result.data[1] || !result.data[1].data.children) {
              return [];
          }

          return result.data[1].data.children
            .filter(filterEmptyData)
            .map(_mapSubData)
        }catch(e){
          console.error(e);
        }
      });
    };
    return {
      getPosts: getPosts
    }
  }

}());
