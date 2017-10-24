var app = angular.module("myApp", ["ngRoute","infinite-scroll", "ngMap"]);

app.config(function($routeProvider) {
    $routeProvider
    // .when("/", {
    //     templateUrl : "partials/home.htm",
    //     controller : "HomeController"
    // })
    .when("/", {
        templateUrl : "partials/home.htm",
        controller : "HomeController"
    })
    .when("/vision", {
        templateUrl : "partials/vision.htm",
        controller : "VisionController"
    })
    .when("/camera", {
        templateUrl : "partials/camera.htm",
        controller : "CameraController"
    })

});

app.run(function($rootScope) {
  $rootScope.gm={

  },
  $rootScope.logLatLng = function(e) {
         console.log('loc', e.latLng);
       }
});
