
var app = function(){

  var crimeList = [];
  var selectedCrimes = JSON.parse( localStorage.getItem( 'crimes' )) || {}

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
  var storedCrime = localStorage.getItem( 'crimes' );
  var crimeToDisplay = null;

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
    console.log ("helllllo")
    var crimeToDisplay = this.value;
    // var crimeSelected = uniqueCrimeList[index];  

    console.log(" MAKESELECTION index", crimeToDisplay);
    console.log(" MAKESELECTION crime", crimes);
    updateInfo(crimeToDisplay, crimes);

    var jsonString = JSON.stringify( crimeToDisplay );
    localStorage.setItem( 'selectedCrime', jsonString )  
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

updateInfo
var updateInfo = function( crimeToDisplay, crimes ) {
  var ul = document.querySelector('#list');
  var li = document.createElement('li');

  crimes.forEach(function(item, index) {

    if (crimes[index].category === crimeToDisplay) {

      li.innerText = "location: " +crimes[index].location.street.name + index;
      ul.appendChild(li);
      li.innerText = "Outcome: " + crimes[index].outcome_status.category;
      ul.appendChild(li);

    }

        //     pTags[0].innerText = crimes[index].street_name
        //   }
        //   crimes[index] = item.category;
        });

}

  window.addEventListener('load', app);

