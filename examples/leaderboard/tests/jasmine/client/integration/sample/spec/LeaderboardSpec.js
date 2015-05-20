/**
 * Wait for React to finish Rendering.
 * @param callback
 */
var waitForRender = function (callback) {
    window.setTimeout(function () {
        callback();
    }, 200);
};

var selectGraceHopper = function (callback) {
    Session.set("selected_player", Players.findOne({name: "Grace Hopper"})._id);
    if(callback){
        Deps.afterFlush(function () {
            waitForRender(callback);
        });
    }
};

/**
 * unselectPlayer, required to reset the player selected state between tests.
 * @param callback
 */
var unselectPlayer = function (callback) {
    Session.set("selected_player", null);
    if(callback){
        Deps.afterFlush(function () {
            waitForRender(callback);
        });
    }
};

describe("DOM Tests", function () {

    describe("DOM : Selecting Grace Hopper", function () {
        beforeEach(function (done) {
            Meteor.autorun(function (c) {
                var grace = Players.findOne({name: "Grace Hopper"});
                if (grace) {
                    c.stop();
                    selectGraceHopper(done);
                }
            })
        });

        afterEach(function (done) {
            unselectPlayer(done);
        });

        it("should show Grace above the give points button", function () {
            expect($("div.details > div.name").html()).toEqual("Grace Hopper");
        });


        it("should highlight Grace's name", function () {
            var parentDiv = $("span.name:contains(Grace Hopper)").parent();
            expect(parentDiv.hasClass("selected")).toBe(true);
        });
    });

    describe("DOM : Point Assignment", function () {
        beforeEach(function (done) {
            selectGraceHopper(done);
        });

        afterEach(function (done) {
            unselectPlayer(done);
        });

        it("should give a player 5 points when they are selected and the button is pressed", function () {
            var graceInitialPoints = Players.findOne({name: "Grace Hopper"}).score;
            $("input:button").click();
            expect(Players.findOne({name: "Grace Hopper"}).score).toBe(graceInitialPoints + 5);
        });
    });

    describe("DOM : Player Ordering", function () {
        beforeEach(function (done) {
            waitForRender(done);
        });

        it("should result in a list where the first player has as many or more points than the second player", function () {
            var firstScore = Number($('.player > .score')[0].innerHTML);
            var secondScore = Number($('.player > .score')[1].innerHTML);
            expect(firstScore >= secondScore);
        });
    });

});
