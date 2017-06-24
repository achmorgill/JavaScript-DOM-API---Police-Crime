
var app = function(){

  var crimeList = [];
  var selectedCrimes = JSON.parse(localStorage.getItem('crimes')) || {}

  var url = "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2016-12";

  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', function() {
    var jsonString = this.responseText;
    var crimes = JSON.parse(jsonString);
    console.log(crimes)
    render( crimes );
  });
  request.send();
}

//render 
var render = function( crimes ) {
  var div = document.querySelector('#main');

  var storedCrime = localStorage.getItem('crimes');
  var crimeToDisplay = null;

  if (storedCrime) {
    crimeToDisplay = JSON.parse( storedCrime );
    var select = document.querySelector('#crime-list');
    select.selectedIndex = crimeToDisplay.index;
  }
  else{
    crimeToDisplay = crimes[0];
  }

  populateSelect(crimes);
}

  // crimes.forEach(function(item, index) {
  //   console.log( 'crime', item );
  //   console.log( 'index', index )
  //   item.index = index;
  //   var option = document.createElement('option');
  //   // option.value = index;
  //   option.text = item.category;
  //   div.appendChild(option);
  // });

// }


//   updateInfo(beerToDisplay);
// }
// // updateinfo
// var updateInfo = function(beer) {
//   var pTags = document.querySelectorAll('#main p');
//   var img = document.querySelector('#beer-image');
//   console.log ("beer", beer.name, beer.tagline)
//   pTags[0].innerText = beer.name;
//   pTags[1].innerText = beer.tagline;
//   img.src = beer.image_url;

// }

//populateSelect
var populateSelect = function( crimes ) {
  var crimeList = [];
  var select = document.querySelector('#crime-list');
  console.log("populateselect")
  console.log("crime", crimes)
  console.log('crimeList',crimeList)

  crimes.forEach(function(item, index) {
    console.log("index", index)
    crimeList[index] = item.category;
    console.log("category", crimeList[index])
  });
  console.log("array size", crimeList.length)
  var uniqueCrimeList = crimeList.prototype.sortUnique; 


  }

//   brewdogBeers.forEach(function(item, index) {
//     item.index = index;

//     var option = document.createElement('option');
//     option.value = index;
//     option.text = item.name;
//     select.appendChild(option);
//   });

//   select.addEventListener('change', function(event) {
//     var index = this.value;
//     var beer = brewdogBeers[index];

//     console.log("index", index);
//     console.log("beer", beer)

//     updateInfo(beer);

//     var jsonString = JSON.stringify(beer);
  //   localStorage.setItem('selectedBeer' , jsonString);
  // })






window.addEventListener('load', app);

