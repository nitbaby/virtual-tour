app.controller('MultiController', function($scope, $http, $timeout,  $location, $rootScope, $interval, WebService) {


  var videoElement = document.querySelector('video');
  var audioSelect = document.querySelector('select#audioSource');
  var videoSelect = document.querySelector('select#videoSource');

  navigator.mediaDevices.enumerateDevices()
    .then(gotDevices).then(getStream).catch(handleError);

  audioSelect.onchange = getStream;
  videoSelect.onchange = getStream;

  function gotDevices(deviceInfos) {
    for (var i = 0; i !== deviceInfos.length; ++i) {
      var deviceInfo = deviceInfos[i];
      var option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === 'audioinput') {
        option.text = deviceInfo.label ||
          'microphone ' + (audioSelect.length + 1);
        audioSelect.appendChild(option);
      } else if (deviceInfo.kind === 'videoinput') {
        option.text = deviceInfo.label || 'camera ' +
          (videoSelect.length + 1);
        videoSelect.appendChild(option);
      } else {
        console.log('Found ome other kind of source/device: ', deviceInfo);
      }
    }
  }

  function getStream() {
    if (window.stream) {
      window.stream.getTracks().forEach(function(track) {
        track.stop();
      });
    }

    var constraints = {
      audio: {
        optional: [{
          sourceId: audioSelect.value
        }]
      },
      video: {
        optional: [{
          sourceId: videoSelect.value
        }]
      }
    };

    navigator.mediaDevices.getUserMedia(constraints).
      then(gotStream).catch(handleError);
  }

  function gotStream(stream) {
    window.stream = stream; // make stream available to console
    videoElement.srcObject = stream;
  }

  function handleError(error) {
    console.log('Error: ', error);
  }

  $scope.snapClick = function(){
    var img = takeSnapshot();
    var raw_img = img.replace(/^data\:image\/\w+\;base64\,/, '');
    console.log(raw_img);
    $scope.sendData(raw_img);
  }

  function takeSnapshot(){
    // Here we're using a trick that involves a hidden canvas element.
    var video = video = document.querySelector("#sample_video")
    var hidden_canvas = document.querySelector('canvas'),
        context = hidden_canvas.getContext('2d');

    var width = video.videoWidth,
        height = video.videoHeight;

    if (width && height) {

      // Setup a canvas with the same dimensions as the video.
      hidden_canvas.width = width;
      hidden_canvas.height = height;

      // Make a copy of the current frame in the video on the canvas.
      context.drawImage(video, 0, 0, width, height);

      // Turn the canvas image into a dataURL that can be used as a src for our photo.
      return hidden_canvas.toDataURL('image/png');
    }
  }


  $scope.sendData = function(img){
    var apiKey = "AIzaSyAmW6_z69y7w-502YJ7usjAHg85gP4Hjuc";
    var url = "https://vision.googleapis.com/v1/images:annotate?key=" + apiKey;
    if(img){
      // data.requests[0].image={
      //   content: img
      // }
      // var raw_img = img.replace(/^data\:image\/\w+\;base64\,/, '');
      // console.log(raw_img);
      data={"requests":[
        {"image":{"content":img},
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


});
