//var module = angular.module("bandGalleryDemo");
//
//module.service("models.ImageService", [function(){

	angular.module('models.ImageService', ['lodash', 'services', 'ngSails'])

		.service('ImageService',['$q', 'lodash', 'utils', '$sails','Restangular', function($q, lodash, utils, $sails,Restangular) {


			this.getBandGalleryImgs = function(){
		return [{"url":"img/sunfield.jpg", "title":"Completely responsive", "description":"Play around with the window sizes, the bandGallery will always fit on your view!"},
		 		{"url":"img/lake.jpg", "title":"Customizable controll elements", "description":"Don't like the page number on the left bottom? Just set the page-nr attribute to false"},
		 		{"url":"img/boat.jpg", "title":"Fresh floating", "description":"Smooth scrolling due to previous and next-buttons on the side"},
		 		{"url":"img/sea.jpg", "title" : "Presenting big pictures", "description":"Showing fullscreen images to present all your best!"},
		 		{"url":"img/tree.jpg","title": "tree big pictures","description": "Showing fullscreen images to present all your best!"},
			{"url":"img/8101363005_1fefd75305_b.jpg","title": "nina big pictures","description": "Showing fullscreen images to present all your best!"},
			{"url":"img/8103274193_9e5ed56fec_b.jpg","title": "nina big pictures","description": "Showing fullscreen images to present all your best!"},
			{"url":"img/8185265808_a44b7b0a5b_b.jpg","title": "nina big pictures","description": "Showing fullscreen images to present all your best!"},
			{"url":"img/8185266724_96c5d1434f_b.jpg","title": "nina big pictures","description": "Showing fullscreen images to present all your best!"},
			{"url":"img/8487509306_47d922dbfb_b.jpg","title": "nina big pictures","description": "Showing fullscreen images to present all your best!"},


		];
	}
}]);