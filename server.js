// Requiring the necessary npm packages 
var express = require("express");
// var path = require("path");
var bodyParser = require("body-parser");
// Telling node that were creating an express server
var app = express();
// setting up port, giving heroku the option to set up port, or else use 8080
var PORT = process.env.PORT || 8080;
// setting up express to use data parsing to make communication between front-end and back-end easier
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// requiring the different routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})