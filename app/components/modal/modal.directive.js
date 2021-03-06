"use strict";


angular
    .module("app.components")
    .directive("modalElement", [commentDirectivr]);

function commentDirectivr() {
    return {
        restrict: "E",
        scope: {},
        templateUrl: "app/components/modal/modal.html",
        controller: ["$scope", "commentsService", function($scope, commentsService){
            $scope.$watch(function(){
                return commentsService.getModalComment();
            }, function(newVal){
                if(newVal) {
                    $("#fake-trigger").click();
                    $scope.modalComment = newVal;
                    $scope.replies = newVal.replies
                        .map(function(reply){
                            return {
                                body: reply.data.body,
                                author: reply.data.author,
                                date:  commentsService.timeDifference(new Date(), new Date(reply.data.created_utc * 1000)) ,
                                avatar: commentsService.genRandomAvatar()
                            }
                        })
                        .filter(function(reply){
                            return !!reply.body;
                        });
                }
            });
        }],
        compile: function() {
            initModal();
        }
    }
}
