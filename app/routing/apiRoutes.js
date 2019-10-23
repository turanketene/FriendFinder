var friends = require('../data/friends.js');

// Routing the apiRoutes with the app.get and app.post functions
module.exports = function (app) {
    // The app.get request handles when user 'visits' a page
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });
    // The app.post request handles when a user submits the survey and thus provides information for the server
    app.post('/api/friends', function (req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            // Used to track differences between answers
            friendDifference: 1000
        };
        // console.log(req.body);

        // Taking the result of the user's survey POST and parsing it
        var userData = req.body;
        var userScores = userData.scores;
        // The variable used to calculate the difference b/n the user's socres and the scores of each user
        var totalDifference = 0;

        //loop through the friends data array of objects to get each friends scores
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i].name);
            totalDifference = 0;

            //loop through that friends score and the users score and calculate the absolute difference between the two and push that to the total difference variable set above
            for (var j = 0; j < friends[i].scores[j]; j++) {
                // We calculate the difference between the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                // If the sum of differences is less then the differences of the current "best match"
                if (totalDifference <= bestMatch.friendDifference) {

                    // Reset the bestMatch to be the new friend. 
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        // The push method use to save user's data to the database
        friends.push(userData);

        //The res.json method will return a JSON data with the user's match which was looped through frieds data array. 
        res.json(bestMatch);
    });
};