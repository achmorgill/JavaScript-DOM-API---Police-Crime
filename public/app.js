
var app = function(){

  var crimeList = [];
  var selectedCrimes = JSON.parse( localStorage.getItem( 'crime' )) || {}

  var url = "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2016-12";

  var request = new XMLHttpRequest();
  request.open( "GET", url );
  request.addEventListener( 'load', function() {
    var jsonString = this.responseText;
    var crimes = JSON.parse( jsonString );

    var chosenCrime = render( crimes );
    populateSelect ( crimes );

  });
  request.send();
}

//render 
var render = function( crimes ) {
  var div = document.querySelector( '#main' );
  storedCrime = localStorage.getItem( 'selectedCrime' );
  var crimeToDisplay = null;
  console.log("crime", storedCrime)

  if ( storedCrime ) {
    crimeToDisplay = JSON.parse( storedCrime );
    var select = document.querySelector( '#crime-list' );
    select.selectedIndex = crimeToDisplay.index;
  }
  else{
    crimeToDisplay = crimes[0];
  }
  return crimeToDisplay;  console.log('crimmmmmes', crimes)

}

//populateSelect
var populateSelect = function( crimes ) {
  var crimeList = [];
  var uniqueCrimeList= [];
  var select = document.querySelector('#crime-list');
  var pTags = document.querySelector('#main p');

  crimes.forEach(function(item, index) {
    crimeList[index] = item.category;
  });

  var uniqueCrimeList = removeDuplicates( crimeList );
  uniqueCrimeList.forEach (function( uniqueCrimeList, index ) {
    var option = document.createElement('option');
    option.text = uniqueCrimeList;
    select.appendChild(option);  
  });

  select.addEventListener('change', function(event) {
    var crimeToDisplay = this.value;
    updateInfo(crimeToDisplay, crimes);
  })
}

//removeDuplicates
var removeDuplicates = function ( crimeList ) {
  var uniqueCrimeList = crimeList.filter(function( crime, currentIndex) {
    var firstCrimeType = crimeList.indexOf(crime);
    return firstCrimeType === currentIndex;
  });
  return  uniqueCrimeList;
}

//updateInfo - displays the last item in the list - overwrites each value until the last one - left it like this as there would be too much data to display on the screen.
var updateInfo = function( crimeToDisplay, crimes ) {
  var ul = document.querySelector('#list');
  var button = document.querySelector('#maps');
  var li = document.createElement('li');
  console.log(crimes)

  crimes.forEach(function(item, index) {

    if (crimes[index].category === crimeToDisplay) {

      var outputString = crimeToDisplay.toUpperCase()  + "\nLocation: " + crimes[index].location.street.name + "\nCoordinates: Lat : " + crimes[index].location.latitude + "  Long : " + crimes[index].location.longitude  + "\nOutcome: " + crimes[index].outcome_status.category;

      li.innerText = outputString;
      ul.appendChild(li);
      var jsonString = JSON.stringify( outputString );
      localStorage.setItem( 'selectedCrime', jsonString ) 
     
    }
  })
}

window.addEventListener('load', app);

