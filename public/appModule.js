var app = angular.module('fullStackReview', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/app/templates/home.html',
			controller: 'HomeCtrl'
		})
		.when('/user', {
			templateUrl: '/app/templates/user.html',
			controller: 'UserCtrlr',
			resolve: {
				
			}
		})
		.when('/products', {
			templateUrl: '/app/templates/products.html',
			controller: 'ProductCtrl'
		})
		// .when('/products/:id', {
		// 	templateUrl: '/app/templates/single-product/product-view.html',
		// 	controller: 'singlProdCtrl'
		// })
		.when('/dashboard', {
			templateUrl: '/app/templates/dashboard/dashboard-view.html',
			controller: 'DashboardCtrl'
		})
		.otherwise('/');
})