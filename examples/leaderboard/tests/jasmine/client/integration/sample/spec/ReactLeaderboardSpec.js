var waitForRender = function (callback) {
    window.setTimeout(function () {
        callback();
    }, 200);
};

describe("React Tests", function () {

    describe("Selecting Grace Hopper", function () {

        it("should show Grace Hopper is selected", function (done) {

            var form = React.addons.TestUtils.renderIntoDocument(React.createElement(MyApp.Leaderboard));

            var players = React.addons.TestUtils.scryRenderedDOMComponentsWithClass(form, 'player');

            // verify before clicking that the player is unselected.
            expect(form.state.selectedName).toBeUndefined();
            expect(players[0].props.className).not.toContain("selected");

            React.addons.TestUtils.Simulate.click(players[0]);

            // wait for the click to update the state and render the react element...
            waitForRender(function () {
                // ... and then verify player is selected via the state and rendered props.
                expect(form.state.selectedName).toBe("Grace Hopper");
                expect(players[0].props.className).toContain("selected");
                done();
            });
        });
    });


    describe("Point Assignment", function () {

        it("should give a player 5 points when they are selected and the 'add points' button is pressed", function (done) {
            var form = React.addons.TestUtils.renderIntoDocument(React.createElement(MyApp.Leaderboard));

            var players = React.addons.TestUtils.scryRenderedDOMComponentsWithClass(form, 'player');
            var button = React.addons.TestUtils.findRenderedDOMComponentWithClass(form, 'inc');
            var graceInitialPoints = players[0].props.children[1].props.children;

            // select the Grace Hopper player.
            React.addons.TestUtils.Simulate.click(players[0]);

            // wait for the click to update the state and render the react element...
            waitForRender(function () {
                // ... now click the add ponts button and wait again...
                React.addons.TestUtils.Simulate.click(button);
                waitForRender(function () {
                    // ... and verify score was incremented.
                    var graceFinalPoints = players[0].props.children[1].props.children;
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
            var firstScore = players[0].props.children[1].props.children;
            var secondScore = players[1].props.children[1].props.children;
            expect(firstScore >= secondScore);
        });
    });
});