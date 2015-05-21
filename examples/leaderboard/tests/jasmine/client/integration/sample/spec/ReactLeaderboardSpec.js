var waitForRender = function (callback) {
    Meteor.setTimeout(function () {
        callback();
    }, 200);
};

var getPlayerByName = function(players, name) {

    for(var index = 0; index < players.length; index++) {
        if (players[index].props.children[0].props.children === name) {
            return players[index];
        }
    }
    return undefined;
};

var getPlayerChildPropByClassName = function(player, name) {

    for(var index = 0; index < player.props.children.length; index++) {
        if (player.props.children[index].props.className === name) {
            return player.props.children[index].props.children;
        }
    }
    return undefined;
};


describe("React Tests", function () {

    describe("Selecting Grace Hopper", function () {

        it("should show Grace Hopper is selected", function (done) {

            var form = React.addons.TestUtils.renderIntoDocument(React.createElement(MyApp.Leaderboard));

            var players = React.addons.TestUtils.scryRenderedDOMComponentsWithClass(form, 'player');

            var playerGraceHopper = getPlayerByName(players, 'Grace Hopper');
            expect(playerGraceHopper !== undefined);

            // verify before clicking that the player is unselected.
            expect(form.state.selectedName).toBeUndefined();
            expect(playerGraceHopper.props.className).not.toContain("selected");

            React.addons.TestUtils.Simulate.click(playerGraceHopper);

            // wait for the click to update the state and render the react element...
            waitForRender(function () {
                // ... and then verify player is selected via the state and rendered props.
                expect(form.state.selectedName).toBe("Grace Hopper");
                expect(playerGraceHopper.props.className).toContain("selected");
                done();
            });
        });
    });


    describe("Point Assignment", function () {

        it("should give a player 5 points when they are selected and the 'add points' button is pressed", function (done) {
            var form = React.addons.TestUtils.renderIntoDocument(React.createElement(MyApp.Leaderboard));

            var players = React.addons.TestUtils.scryRenderedDOMComponentsWithClass(form, 'player');
            var playerGraceHopper = getPlayerByName(players, 'Grace Hopper');
            expect(playerGraceHopper !== undefined);
            var button = React.addons.TestUtils.findRenderedDOMComponentWithClass(form, 'inc');
            var graceInitialPoints = getPlayerChildPropByClassName(playerGraceHopper, 'score');

            // select the Grace Hopper player.
            React.addons.TestUtils.Simulate.click(playerGraceHopper);

            // wait for the click to update the state and render the react element...
            waitForRender(function () {
                // ... now click the add ponts button and wait again...
                React.addons.TestUtils.Simulate.click(button);
                waitForRender(function () {
                    // ... and verify score was incremented.
                    var graceFinalPoints = getPlayerChildPropByClassName(playerGraceHopper, 'score');
                    expect(graceFinalPoints).toBe(graceInitialPoints + 5);
                    done();
                });
            });
        });
    });


    describe("Player Ordering", function () {
        it("should result in a list where the first player has as many or more points than the second player", function () {
            var form = React.addons.TestUtils.renderIntoDocument(React.createElement(MyApp.Leaderboard));
            var players = React.addons.TestUtils.scryRenderedDOMComponentsWithClass(form, 'player');
            var firstScore = getPlayerChildPropByClassName(players[0], 'score');
            var secondScore = getPlayerChildPropByClassName(players[1], 'score');
            expect(firstScore >= secondScore);
        });
    });
});