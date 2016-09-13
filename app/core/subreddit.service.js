(function () {
  'use strict';


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
    return secondItem.score - firstItem.score;
  }

  var subredditService = function($http){
    return {
      getPosts: function(subredditId ) {
        return $http.get("../mock/subreddit.json")
                     .then(function(result){
                       try{
                         return result.data[1].data.children.map(_mapSubData)
                                                            .sort(_sortSubData);
                       }catch(e){
                         console.error(e);
                       }
             });
      }
    };
  };

  angular
    .module('app.core')
    .factory('subredditService', subredditService);
}());
