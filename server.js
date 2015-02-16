var Express = require('express');
var app = Express();
var port = 9999;
var Passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var Mongoose = require('mongoose').Strategy;
var BodyParser = require("body-parser");
var Session = require('express-session');

app.use(BodyParser.json());
app.use(Express.static(__dirname + '/public'));
app.use(Session ({ secret: "fullStackReview" }));
app.use(Passport.initialize()):
app.use(Passport.session());


Passport.use(new GoogleStrategy({
    clientID: '479207805133-qver7jj6uqlb1itp88cp14i6ihu1dvp1.apps.googleusercontent.com',
    clinetSecret: "6Zw0p2iyhKil5dpOPbyyGEpx",
    callbackURL: "localhost:9999/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
    done(null, profile);
    });
  }
));

app.get('/auth/google', Passport.authenticate('google', { scope: "https://www.googleapis.com/auth/plus.login"}));

app.get('/auth/google/callback', Passport.authenticate('google', {
	failureRedirect: 'auth/failure';
}), function(req, res) {
	res.redirect("/api/me");
})

app.listen(port, function() {
	console.log("Listening on port " + port);
)};
