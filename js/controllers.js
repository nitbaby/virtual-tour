app.controller('HomeController', function($scope, $http, $timeout,  $location, $rootScope, $interval, WebService) {


});


app.controller('CameraController', function($scope, $http, $timeout,  $location, $rootScope, $interval, WebService) {

  var apiKey = "AIzaSyAmW6_z69y7w-502YJ7usjAHg85gP4Hjuc";
  var url = "https://vision.googleapis.com/v1/images:annotate?key=" + apiKey;
  //  data:image/png;base64,


  $scope.sendData = function(img){
    if(img){
      // data.requests[0].image={
      //   content: img
      // }
      var raw_img = img.replace(/^data\:image\/\w+\;base64\,/, '');
      console.log(raw_img);
      data={"requests":[
        {"image":{"content":raw_img},
        "features":[{"type":"TYPE_UNSPECIFIED","maxResults":50},
        {"type":"LANDMARK_DETECTION","maxResults":50},
        {"type":"FACE_DETECTION","maxResults":50},
        {"type":"LOGO_DETECTION","maxResults":50},
        {"type":"LABEL_DETECTION","maxResults":50},
        {"type":"TEXT_DETECTION","maxResults":50},
        {"type":"DOCUMENT_TEXT_DETECTION","maxResults":50},
        {"type":"SAFE_SEARCH_DETECTION","maxResults":50},
        {"type":"IMAGE_PROPERTIES","maxResults":50},
        {"type":"CROP_HINTS","maxResults":50},
        {"type":"WEB_DETECTION","maxResults":50}],
        "imageContext":{"cropHintsParams":{"aspectRatios":[0.8,1,1.2]}}}
      ]};

    }

    $http({
        url: url,
        method: "POST",
        data: data
    })
    .then(function(response) {
      console.log('response', response);
      var label = response.data.responses[0].landmarkAnnotations[0].description;
      $scope.location = label;
      alert("location: "+ label);
            // success
    },
    function(error) { // optional
            // failed
      console.log('error', error);
    })
  };


  Webcam.set({
    width: 240,
    height: 240,
    // image_format: 'png',
    // jpeg_quality: 90
  });
  Webcam.attach( '#my_camera' );

  $scope.take_snapshot = function() {
    // take snapshot and get image data
    Webcam.snap( function(data_uri) {
      $scope.sendData(data_uri);
      console.log(data_uri);
      // display results in page
      document.getElementById('results').innerHTML =
        '<h2>Here is your image:</h2>' +
        '<img src="'+data_uri+'"/>';
    } );


  }
});


app.controller('ActivityController', function($scope, $routeParams, $http, $timeout,  $location, $rootScope, $interval, WebService) {

  var location = $routeParams.location;
  $scope.activities = null;

  $scope.findActivities = function(location){
    var filename = location+'.json';
    console.log(filename);
    var url = "../stubs/"+filename;
    $http({
        headers:{
          key: "4f8ce657-ee06-4527-a8d8-4b207f8f0d62"
        },
        url: url,
        method: "GET"
    })
    .then(function(response) {
      console.log(response);
      $scope.activities = response.data.activities;
      $scope.currency = response.data.currencyCode;

    },function(err){
      alert("Sorry!! We are not able to fetch any activities for the destination");
    })
  }

  $scope.findActivities(location);

});
