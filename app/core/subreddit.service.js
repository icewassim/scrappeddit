(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('subredditService', ['$http', subredditService]);

   function subredditService($http) {

      function filterEmptyData(comment) {
          return !!comment.data.body;
      }

    var _mapSubData = function(child) {
      return {
        author:child.data.author,
        created:child.data.created,
        edited:child.data.edited,
        score:child.data.score,
        ups:child.data.ups,
        // replies:child.data.replies,
        body:child.data.body
      }
    };

    var _sortSubData = function(firstItem, secondItem) {
      //TODO Sort By attribute
      return secondItem.body.length - firstItem.body.length;
    }

    var getPosts = function(subredditId ) {

      //return $http.get("https://www.reddit.com/r/AskReddit/comments/5i5csd/what_is_your_i_know_it_sounds_weird_but_just_try.json")
      return $http.get("../mock/subreddit.json")
      //return $http.get("https://www.reddit.com/r/AskReddit/comments/5kdfsf/people_whove_deleted_facebook_what_was_the_final.json")
                  .then(function(result){
        try{
          return result.data[1].data.children
          .filter(filterEmptyData)
          .map(_mapSubData)
          .sort(_sortSubData);
        }catch(e){
          console.error(e);
        }
      });
    };
    return {
      getPosts: getPosts
    }
  };

}());
