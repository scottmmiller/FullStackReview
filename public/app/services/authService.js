var app = angular.module('fullStackReview');

app.service("authService", function($http, $q){
	this.user = {};

	this.updateUser = function() {
		return $http({
			method: "GET",
			url: "/api/me",

		}).then(function(res) {
			console.log(res);
			this.user = res.data;
			return this.user;
		});
	};

	this.logout = function() {
		
	}

});