describe("subreddit service", function () {
    var subredditService,
        httpBackend;

    beforeEach(function(){
        module("app.core");
    });


    beforeEach(inject(function (_subredditService_, $httpBackend) {
        subredditService = _subredditService_;
        httpBackend = $httpBackend;
    }));

    it("should map comments from api ", function() {
            httpBackend.whenGET("https://api.reddit.com/r/AskReddit/comments/5aih71.json").respond([1,{
                data: {
                    children: [{
                            data: {
                                author: "testAuthor",
                                created_utc: "child.data.created",
                                edited: "child.data.edited",
                                score: "child.data.score",
                                ups: "child.data.ups",
                                replies: {},
                                lol:"dsqdsq",
                                dsqds:"dqsdsq",
                                body: "child.data.bod"
                            }
                        },
                        {
                            data: {
                                author: "testAuthor",
                                created: "child.data.created",
                                edited: "child.data.edited",
                                score: "child.data.score",
                                ups: "child.data.ups",
                                replies: undefined,
                                qdsqdsq:"dsqds",
                                body: "child.data.bod"
                            }
                        }
                    ]
                }
         }]);

           subredditService.getPosts("AskReddit","5aih71").then(function(data){
                expect(data[0]).toEqual({
                        author: "testAuthor",
                        created:"child.data.created",
                        edited:"child.data.edited",
                        score:"child.data.score",
                        replies: undefined,
                        ups:"child.data.ups",
                        body:"child.data.bod"
                    });
                expect(data.length).toBe(2);
            });

            httpBackend.flush();
    });

    it("should filter empty  comments  ", function() {
            httpBackend.whenGET("https://api.reddit.com/r/AskReddit/comments/5aih71.json").respond([1,{
               data: {
                   children: [{
                           data: {
                               author: "testAuthor",
                               created: "child.data.created",
                               edited: "child.data.edited",
                               score: 223,
                               ups: "child.data.ups",
                               body: "child.data.bod"
                           }
                       },
                       {
                           data: {
                               author: "testAuthor",
                               created: "child.data.created",
                               edited: "child.data.edited",
                               score: 22,
                               ups: "child.data.ups",
                           }
                       }
                   ]
               }
            }]);

           subredditService.getPosts("AskReddit","5aih71").then(function(data){
                expect(data.length).toBe(1);
            });
            httpBackend.flush();
    });

    it("should handle empty  response", function() {
            httpBackend.whenGET("https://api.reddit.com/r/AskReddit/comments/5aih71.json").respond([1,{
               data: {
               }
            }]);

           subredditService.getPosts("AskReddit","5aih71").then(function(data){
                expect(data).toEqual([]);
            })
            httpBackend.flush();
    });

    // it("should sort comments  by score length", function() {
    //         httpBackend.whenGET("https://api.reddit.com/r/AskReddit/comments/5aih71.json").respond([1,{
    //             data: {
    //                 children: [{
    //                         data: {
    //                             score: 223,
    //                             body: "dsdsqdsqdsqdsbod"
    //                         }
    //                     },
    //                     {
    //                         data: {
    //                             body: "chdsddsqdqdsqdsqildsqbod",
    //                             score: 324,
    //                         }
    //                     },
    //                     {
    //                         data: {
    //                             body: "chta.bod",
    //                             score: 0,
    //                         }
    //                     },
    //                 ]
    //             }
    //         }]);
    //
    //        subredditService.getPosts("AskReddit","5aih71").then(function(data){
    //             expect(data[2].score).toEqual(0);
    //             expect(data[1].score).toEqual(223);
    //             expect(data[0].score).toEqual(324);
    //         })
    //         httpBackend.flush();
    // });
});
