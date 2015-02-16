var app = angular.module("fullStackReview", ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/app/templates/home.html',
			controller: 'homeCtrlr',
			resolve: {

			}
		})
		.when ('/products', {
			templateUrl: '/app/templates/products.html',
			controller: 'ProductCtrlr',
			resolve: {

			}
		})
		.when("/products/:id", {
			templateUrl: '/app/templates/products.html',
			controller: 'ProductCtrlr',
			resolve: {

			}
		})
		.otherwise("/");
});