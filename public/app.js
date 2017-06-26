
var app = function(){

  var crimeList = [];
  var storedCrime = JSON.parse( localStorage.getItem( 'crime' )) || {}

  var url = "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2016-12";

  var request = new XMLHttpRequest();
  request.open( "GET", url );
  request.addEventListener( 'load', function() {
    var jsonString = this.responseText;
    var allCrimes = JSON.parse( jsonString );

    crimesToDisplay = render( allCrimes );
    populateSelect ( crimesToDisplay, allCrimes );
  });
  request.send();
}

//render 
var render = function( allCrimes ) {
  var div = document.querySelector( '#main' );
  storedCrime = localStorage.getItem( 'selectedCrime' );
  var crimeToDisplay = "";
  console.log("crime", storedCrime)

  if ( storedCrime ) {
    console.log(" storedcrime saved")
    crimeToDisplay = JSON.parse( storedCrime );
    var select = document.querySelector( '#crime-list' );
    select.selectedIndex = crimeToDisplay.index;
    console.log("crimeTodisplay", crimeToDisplay)
  }
  else{
    console.log("set crimesToDisplay = allCrimes[0]")
    crimeToDisplay = allCrimes[0];
  }
  return crimeToDisplay

}

//populateSelect
var populateSelect = function( crimesToDisplay,allCrimes ) {
  var crimeCategories = [];
  var uniqueCrimeList= [];
  var select = document.querySelector('#crime-list');
  var pTags = document.querySelector('#main p');

  allCrimes.forEach(function(item, index) {
    console.log("for each", item.category);
    crimeCategories[index] = item.category;
  });

  var uniqueCrimeList = removeDuplicates( crimeCategories );
  uniqueCrimeList.forEach (function( uniqueCrimeList, index ) {
    var option = document.createElement('option');
    option.text = uniqueCrimeList;
    select.appendChild(option);  
  });

  select.addEventListener('change', function(event) {
    var crimeToDisplay = this.value;
    console.log("this.value", crimeToDisplay)
    updateInfo(crimeToDisplay, allCrimes);
  })
}

//removeDuplicates
var removeDuplicates = function ( crimeList ) {
  var uniqueCrimeList = crimeList.filter(function( allCrime, currentIndex) {
    var firstCrimeType = crimeList.indexOf(allCrime);
    return firstCrimeType === currentIndex;
  });
  return  uniqueCrimeList;
}

//updateInfo - displays the last item in the list - overwrites each value until the last one - left it like this as there would be too much data to display on the screen.
var updateInfo = function( crimeToDisplay, allCrimes ) {
  var ul = document.querySelector('#crime-details');
  var button = document.querySelector('#crime-button');

  console.log(allCrimes)
  ul.innerText = ""
  allCrimes.forEach(function(item, index) {

    if (allCrimes[index].category === crimeToDisplay) {
       console.log(" **crimes to display",crimeToDisplay)
      var outputString = crimeToDisplay.toUpperCase()  + "\nLocation: " + allCrimes[index].location.street.name + "\nCoordinates: Lat : " + allCrimes[index].location.latitude + "  Long : " + allCrimes[index].location.longitude  + "\nOutcome: " + allCrimes[index].outcome_status.category;

      console.log("outuptstring",outputString)
      var li = document.createElement('li');
      li.innerText = outputString;
      ul.appendChild(li);
      console.log("json",jsonString)

      var jsonString = JSON.stringify( outputString );
      localStorage.setItem( 'selectedCrime', jsonString ) 

    }
  }) 
  // button.addEventListener('click', initialise);

}

window.addEventListener('load', app);

