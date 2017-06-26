var initialise = function(){
  console.log("clicked")
  var crimeMap = document.getElementById('main');
  // var crimeButton = document.querySelector('#crime-button');

  var center = { lat: 40.712784, lng: -74.005941 };

  var mainMap = new MapWrapper(crimeMap, center, 10);
  mainMap.addInfoWindow(center, "crime scene");

  var goToMap = function(){
    var location = { lat: 41.878114, lng: -87.629798 };
    mainMap.googleMap.setCenter(location);
    mainMap.addInfoWindow(location, "<h3>Crime Scene</h3>"); 
  }

  crimeButton.addEventListener('click', goToMap);
}

window.addEventListener('load', initialise);