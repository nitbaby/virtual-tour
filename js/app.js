var app = angular.module("myApp", ["ngRoute","infinite-scroll", "ngMap"]);

app.config(function($routeProvider) {
    $routeProvider
    // .when("/", {
    //     templateUrl : "partials/home.htm",
    //     controller : "HomeController"
    // })
    .when("/", {
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

});

app.run(function($rootScope) {
  $rootScope.gm={

  },
  $rootScope.logLatLng = function(e) {
         console.log('loc', e.latLng);
       }
});
