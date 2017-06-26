

var MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
}

MapWrapper.prototype = {
  addInfoWindow: function(coords, text) {
    var infoWindow = new google.maps.InfoWindow({
      content: text
    })
    infoWindow.open(this.map, coords);
  }
}

 