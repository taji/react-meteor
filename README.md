react-meteor (with example tests)
=========================

This is a fork of Ben Newman's react-meteor package (https://github.com/reactjs/react-meteor).  The primary difference is that I've added jasmine client integration tests to the react-meteor leaderboard app in the examples folder.  There are two set of tests, both testing the same thing but using two different approaches:  

  *  The Leaderboard.spec tests make use of the DOM and JQuery to trigger events and verify expectations. 
  *  The ReactLeaderboard.js tests only interact with the Leaderboard React component (and it's respective descendent components).  These tests trigger the same events and verify the same expectations but do so against the respective React events, props and states.

Having completed the exercise, I would say the ReactLeaderboard.js tests hew closer to the domain of the leaderboard app. See the tests folder under meteor-react/examples/ for more details.

The tests are run via the velocity sanjo:jasmine runner and use both the html and console reporters. To run the tests:

    cd react-meteor/examples/leaderboard
    meteor

You can watch the tests run from the console or by opening your browser to https://localhost:3000 and clicking the green dot in the upper right hand corner of the page (may take about 30 seconds to appear).

