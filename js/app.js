var app = angular.module("myApp", ["ngRoute","infinite-scroll", "youtube-embed"]);

app.config(function($routeProvider) {
    $routeProvider
    // .when("/", {
    //     templateUrl : "partials/home.htm",
    //     controller : "HomeController"
    // })
    .when("/", {
        templateUrl : "partials/multi.htm",
        controller : "MultiController"
    })
    .when("/camera", {
        templateUrl : "partials/camera.htm",
        controller : "CameraController"
    })
    .when("/home", {
        templateUrl : "partials/home.htm",
        controller : "HomeController"
    })
    .when("/vision", {
        templateUrl : "partials/vision.htm",
        controller : "VisionController"
    })
    .when("/mobile", {
        templateUrl : "partials/mobile.htm",
        controller : "MobileController"
    })
    .when("/activities/:location", {
        templateUrl : "partials/activities.htm",
        controller : "ActivityController"
    })
    .when("/tour/", {
        templateUrl : "partials/tour.htm",
        controller : "TourController"
    })

});

app.run(function($rootScope) {
  $rootScope.isLoading = false;
  $rootScope.location = null;
});
