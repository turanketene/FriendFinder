var path = require("path");

module.exports = function(app) {
    // Directing the user to different page depending on route
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/survey.html"));
    });
    // If user doesn't route to any page, default it to home.html
    app.use(function(req,res) {
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    });
}