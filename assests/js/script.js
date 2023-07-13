var APIKey = "cf9803c3b377a9b6c5550c2755ccbd51"
var searchButton = document.getElementById("search-btn")
var cityLocation = document.getElementById("search-city")

function search() {
    var content = cityLocation.value
    console.log(content)

    var url = "api.openweathermap.org/data/2.5/forecast?" + content + "&appid=" + APIKey + "&units=imperial"

    console.log(url)

    
}

// 3 global variables
// 1 for API KEY
//1 for base url: openweathermap.org
// search history array


// FUNCTION === Display search history
// loop over history array and count down so the most recent search is at the top

// FUNCITON --- update search history in local storage

// Function --- get search history from local storage

// Function -- display current weather data from fetch request

// fucntions -- display 5 day forcast data from fetch request
//--- need icon, tempt, humidity, date, wind speet

function getApi() {
    var apiURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={cf9803c3b377a9b6c5550c2755ccbd51}"
}

// create elements for each of the above

//create elements for each of the above

// FUNCTION -- display 5 day forcast data from fetch request for each card

// FUNCTION -- specifically for geolocation with lat and long and use fucntion above to make calls here

//FUNCTION -- event listener for each button