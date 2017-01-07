describe("Controller testing", function(){
    var scope,
        controller,
        boardController,
        BOARD_CONFIG = {};

    beforeEach(function(){
        module("app.core");
    });

    beforeEach(inject(function ($rootScope, $controller, _$timeout_, _$q_) {
        var  commentsService,
             subredditService;

        scope = $rootScope.$new();
        controller = $controller;
        commentsService = {};
        subredditService  = {
            getPosts: function() {
                var defferred = _$q_.defer();
                return defferred.promise;
            }
        };

        boardController =  controller("boardController", {
            "commentsService": commentsService,
            "subredditService": subredditService,
            "BOARD_CONFIG": BOARD_CONFIG,
            "$scope": scope
        });
    }));

    describe("default state testing", function() {
        it("should be defined", function () {
            expect(boardController).toBeDefined();
        });


        it("should have an Empty Comments Array by default", function () {
            expect(boardController.comments).toBeDefined();
            expect(typeof boardController.comments).toBe("object");
            expect(boardController.comments.length).toBe(0);
        });

    });
});
