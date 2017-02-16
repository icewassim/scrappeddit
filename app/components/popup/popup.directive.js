(function() {
    "use strict";

    angular
        .module("app.components")
        .directive("popupHover", popupHover);

    function popupHover() {
        return {
            restrict: "E",
            replace: true,
            scope: {
                hoveredComment: '='
            },
            templateUrl: "app/components/popup/popup.html",
            controller: ["$scope", "commentsService", function($scope, commentsService) {
                $scope.triggerRepliesModal= function(comment) {
                    commentsService.setModalComment(comment, []);
                };

                $scope.onMouseEnter = function() {
                    commentsService.clearHoverTimeout();
                };

                $scope.$watch("hoveredComment", function (newVal) {
                    var coordinates;
                    if(!newVal) {
                        return false;
                    }
                    coordinates = commentsService.getPopupCoordinates(newVal.position, newVal.offset, newVal.size);
                    $scope.content = newVal;
                    $scope.coordinates = {
                        position: coordinates.position,
                        placement: coordinates.placement
                    };
                });
            }]
        };
    }

})();
