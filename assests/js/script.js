var APIKey = "cf9803c3b377a9b6c5550c2755ccbd51"
var searchButton = document.getElementById("search-btn")
var cityLocation = document.getElementById("search-city")

function search() {
    var content = cityLocation.value
    console.log(content)

    var url = "api.openweathermap.org/data/2.5/forecast?" + content + "&appid=" + APIKey + "&units=imperial"

    console.log(url)

    fetch(url)

    .then(function(response){
        return response.json()
    })
    .then(function(data){ 
        console.log(data);

        var currentDay = data.list[0];
        var currentDate = new Date();
        var cityName = data.city.name;

        var cadDiv = document.createElement("div");
        cardDiv.classList.add("card", "mx-auto");



        var cardBody = document.createElement("div");
        cardBody.classList.add("cardBody");

        var cardTitle = document.createElement("h1");
        cardTitle.classList.add("cardTitle");
        cardTitle.textContent = "Current Date: " + currentDate.toDateString();

        var cityNametitle = document.createElement("h2");
        cityNametitle.textContent = "City: " + cityName;

        var temperature = document.createElement("p");
        temperature.classList.add("card-text");
        temperature.textContent = "Temperature: " + currentDay.main.temp;

        var windSpeed = document.createElement("p");
        windSpeed.classList.add("card-text");
        windSpeed.textContent = "Wind Speed: " + currentDay.wind.speed;

        var humidity = document.createElement("p");
        humidity.classList.add("card-text");
        humidity.textContent = "Humidity: " + currentDay.main.humidity + "%";

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cityNametitle);
        cardBody.appendChild(temperature);
        cardBody.appendChild(windSpeed);
        cardBody.appendChild(humidity);

        cardBody.appendChild(cardBody);

        var weatherForcastContainer = document.getElementById("weatherForcast");
        currentDay.appendChild(cardDiv);

        var fiveDay = [
            data.list[1],
            data.list[9],
            data.list[17],
            data.list[25],
            data.list[33]
        ]

        console.log(fiveDay)

        for(i = 0; i < fiveDay.length; i++) {
            var sectionBlock = document.createElement("div");
            var d
        }
    })
}

searchButton.addEventListener("click", search)

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