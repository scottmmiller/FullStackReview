var User = require("../models/userModel");
var q = require('q');


module.exports = {
	updateOrCreate: function(user) {
		var deferred = q.defer();
		User.findOne({googleId: user.id}, function(results, error) {
			if(results) {
				User.update({_id: results._id}, {
					name: user.displayName,
					plusLink: user._json.link,
					picture: user._json.picture,
					gender: user._json.gender
				}, function(response, error) {
					if(!error) {
						deferred.resolve(response);
					}
					else {
						deferred.reject(error);
					}
				});
			}
			else {
				User.create({
					name: user.displayName,
					googleId: user.id,
					plusLink: user._json.link,
					picture: user._json.picture,
					gender: user._json.gender
				}, function(response, error) {
					if(!error) {
						deferred.resolve(response);
					}
					else {
						deferred.reject(error);
					}
				});
			}
		});
		return deferred.promise;
	},
	getUser: function(id) {
		var deferred = q.defer();
		User.find({ googleId: id}, function(response, error) {
			if(!error) {
				deferred.resolve(response);
			}
			else {
				deferred.reject(error);
			}
		});
		return deferred.promise;
	}
};