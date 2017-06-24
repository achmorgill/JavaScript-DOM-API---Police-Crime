
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


// displayCrimes
// var displayCrimes = function(chosenCrime, allCrimes) {
//   var pTags = document.querySelectorAll('#main p');
//   console.log("chosenCrime", chosenCrime);
//   console.log("all crimes",allCrimes)

//   allCrimes.forEach(function(item, index) {
//     if (allCrimes[index] = chosenCrime) {
//       pTags[0].innerText = allCrimes[index].street_name
//     }
//     allCrimes[index] = item.category;
//   });


// }

//populateSelect
var populateSelect = function( crimes ) {
  console.log("populateselect")
  var crimeList = [];
  var uniqueCrimeList= [];
  var select = document.querySelector('#crime-list');

  crimes.forEach(function(item, index) {
    crimeList[index] = item.category;
  });

  var uniqueCrimeList = removeDuplicates( crimeList );
  uniqueCrimeList.forEach (function( uniqueCrimeList, index ) {
    var option = document.createElement('option');
    option.text = uniqueCrimeList;
    select.appendChild(option);  
  });

  var div = document.querySelector( '#main p' );
  console.log('div', div)
  div.addEventListener('change', function ( event ) {
    console.log(" in event listerne")
    var index = this.value;
    var crime = uniqueCrimeList[index];  

    console.log(" MAKESELECTION index", index);
    console.log(" MAKESELECTION crime", crime);
    updateInfor(crime);

    var jsonString = JSON.stringify( crime );
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

//makesSelection
// var makeSelection = function( uniqueCrimeList, crimes ) {
//   console.log("makeselection")
//   var div = document.querySelector( '#main p' )

//   div.addEventListener('change', function ( event ) {
//     console.log(" in event listerne")
//     var index = this.value;
//     var crime = uniqueCrimeList[index];  

//     console.log(" MAKESELECTION index", index);
//     console.log(" MAKESELECTION crime", crime);
//     updateInfor(crime);

//     var jsonString = JSON.stringify( crime );
//     localStorage.setItem( 'selectedCrime', jsonString )  

//     crimes.forEach(function(item, index) {
//         if ( crimes[index] = chosenCrime) {
//           pTags[0].innerText = allCrimes[index].street_name
//         }
//         allCrimes[index] = item.category;
//       });
//   })


  window.addEventListener('load', app);

