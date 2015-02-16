var Express = require('express');
var app = Express();
var Passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var Mongoose = require('mongoose');
var BodyParser = require("body-parser");
var Session = require('express-session');
var port = 9999;
var MongoUri = "mongodb://localhost:27017";

//CONTROLLERS
var UserCtrlr = require("./serverAssets/controllers/UserCtrlr.server");


//MIDDLEWARE
app.use(BodyParser.json());
app.use(Express.static(__dirname + '/public'));
app.use(Session ({ secret: "fullStackReview" }));
app.use(Passport.initialize());
app.use(Passport.session());

//SERIALIZATION  --> encrypting/stringifying
Passport.serializeUser(function(user, done) {
	done(null, user)
});

Passport.deserializeUser(function(obj, done) {
	UserCtrlr.getUser(obj.id).then(function(response) {
		done(null, response);
	}, function(error) {
		done(null, obj);
	});
});


Passport.use(new GoogleStrategy({
    clientID: '479207805133-qver7jj6uqlb1itp88cp14i6ihu1dvp1.apps.googleusercontent.com',
    clientSecret: "6Zw0p2iyhKil5dpOPbyyGEpx",
    callbackURL: "http://localhost:9999/auth/google/callback"
 }, function(token, tokenSecret, profile, done) {
 	UserCtrlr.updateOrCreate(profile).then(function(results) {
    	done(null, profile);
 	}, function(error) {
 		done(null, err, profile);
 	})
	}
));


//ENDPOINTS
app.get('/auth/google', Passport.authenticate('google', { scope: "https://www.googleapis.com/auth/plus.login"}));

app.get('/auth/google/callback', Passport.authenticate('google', { 
	successRedirect: '/api/me', 
	failureRedirect: '/auth/failure' 
}));

app.get("/api/me", function(req, res) {
	return res.json(req.user);
});


//CONNECTIONS
Mongoose.connect(MongoUri, function() {
	console.log("Connect to DB on "+ MongoUri);
});

app.listen(port, function() {
	console.log("Listening on port " + port);
});
