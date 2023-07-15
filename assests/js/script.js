// Globally declared variables
// APIKey variable to I don't need to keep putting in the letters and numbers
var APIKey = "cf9803c3b377a9b6c5550c2755ccbd51";
var searchButton = document.getElementById("search-button");
var cityLocation = document.getElementById("search-city");
var weatherBlock = document.getElementById("current-weather");
var fiveDayblock = document.getElementById("fiveDay");
var searchHistorycontainer = document.getElementById("search-history");

// Connects with the search HTML in order to be active
function search() {
    var content = cityLocation.value;
    console.log(content);

    // OpenWeather url to connect the search with their servers
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + content + "&appid=" + APIKey + "&units=imperial";


    weatherBlock.innerHTML = "";
    fiveDayblock.innerHTML = "";

    // fetch grabs the data from the url and puts it to the cards on the page
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){ 
        console.log(data);

        // Variables for the date and city name
        var currentDay = data.list[0];
        var currentDate = new Date();
        var cityName = data.city.name;

        var mainCardDiv = document.createElement("div");
        mainCardDiv.classList.add("card", "mx-auto");



        var cardBody = document.createElement("div");
        cardBody.classList.add("cardBody", 'bg-success');

        var cardTitle = document.createElement("h1");
        cardTitle.classList.add("card-title");

        // Allows the icon to be placed in the file
        var icon = document.createElement("i");
        icon.classList.add("fas", "fa-calendar-alt");

        // Creates a variable for the current date
        var currentDateText = document.createElement("span");
        currentDateText.textContent = "Current Date: " + currentDate.toDateString();

        cardTitle.appendChild(icon);
        cardTitle.appendChild(currentDateText);

        // Creates a variable for the city name
        var cityNametitle = document.createElement("h2");
        cityNametitle.textContent = "City: " + cityName;

        // Creates a variable for the temperature
        var temperature = document.createElement("p");
        temperature.classList.add("card-text");
        temperature.textContent = "Temperature: " + currentDay.main.temp;

        // Creates a variable for wind speed
        var windSpeed = document.createElement("p");
        windSpeed.classList.add("card-text");
        windSpeed.textContent = "Wind Speed: " + currentDay.wind.speed;

        // Creates a variable for humidity
        var humidity = document.createElement("p");
        humidity.classList.add("card-text");
        humidity.textContent = "Humidity: " + currentDay.main.humidity + "%";

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cityNametitle);
        cardBody.appendChild(temperature);
        cardBody.appendChild(windSpeed);
        cardBody.appendChild(humidity);


        mainCardDiv.appendChild(cardBody);
        weatherBlock.appendChild(mainCardDiv);

        // Variable for the five day array
        var fiveDay = [
            data.list[1],
            data.list[9],
            data.list[17],
            data.list[25],
            data.list[33]
        ]

        console.log(fiveDay)

        // The for loop helps create the cards for the five day forcast all the way until it hits 5
        for(i = 0; i < fiveDay.length; i++) {
            var sectionBlock = document.createElement("div");
            sectionBlock.classList.add("card", "col");

            var dateH3 = document.createElement("h3");
            dateH3.textContent = formatDateString(fiveDay[i].dt_txt);

            var weatherIcon = document.createElement("i");
            weatherIcon.classList.add("fas", getWeatherIconClass(fiveDay[i].weather[0].icon));

            var ulNew = document.createElement("ul");
            ulNew.classList.add("list-group");
            ulNew.classList.add("list-group-flush");

            var tempLi = document.createElement("li");
            tempLi.textContent = "Temp: " + fiveDay[i].main.temp;
            tempLi.classList.add("list-group-item");

            var windLi = document.createElement("li");
            windLi.textContent = "Wind Speed: " + fiveDay[i].main.wind;
            windLi.classList.add("list-group-item");

            var humidityLi = document.createElement("li");
            humidityLi.textContent = "Humidity: " + fiveDay[i].main.humidity;
            humidityLi.classList.add("list-group-item");

            sectionBlock.appendChild(dateH3);
            sectionBlock.appendChild(weatherIcon);
            sectionBlock.appendChild(ulNew);

            ulNew.appendChild(tempLi);
            ulNew.appendChild(windLi);
            ulNew.appendChild(humidityLi);

            sectionBlock.appendChild(dateH3);
            sectionBlock.appendChild(ulNew);

            fiveDayblock.appendChild(sectionBlock);
        }

        localCity(content);
        displaySearch();
    });
}

    // icon codes to help display the icons onto each day card
    function getWeatherIconClass(iconCode) {
        var iconMap = {
          "01d": "fa-sun",
          "02d": "fa-cloud-sun",
          "03d": "fa-cloud",
          "04d": "fa-cloud",
          "09d": "fa-cloud-showers-heavy",
          "10d": "fa-cloud-rain",
          "11d": "fa-bolt",
          "13d": "fa-snowflake",
          "50d": "fa-smog",
          "01n": "fa-moon",
          "02n": "fa-cloud-moon",
          "03n": "fa-cloud",
          "04n": "fa-cloud",
          "09n": "fa-cloud-showers-heavy",
          "10n": "fa-cloud-rain",
          "11n": "fa-bolt",
          "13n": "fa-snowflake",
          "50n": "fa-smog",
        };
      
        return iconMap[iconCode];
    }

    // Creates a string for the date
    function formatDateString(dateString) {
        var date = new Date(dateString);
        var formattedDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
        return formattedDate;
    }

    // Creates the search history to be stored in the local data
    function localCity(city) {
        var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
        searchHistory.unshift(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }

    function displaySearch() {
        var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
        searchHistorycontainer.innerHTML = "";

        // This will continue to add into the search history
        for (var i = 0; i < searchHistory.length; i++) {
            var cityDiv = document.createElement("div");
            cityDiv.classList.add("searched-city");
            cityDiv.textContent = searchHistory[i];

            cityDiv.addEventListener("click", function (event) {
                var cityName = event.target.textContent;
                cityLocation.value = cityName;
                search();
            });

            cityDiv.addEventListener("mouseenter", function (event) {
                event.target.classList.add("hovered-city");
            });

            cityDiv.addEventListener("mouseleave", function (event) {
                event.target.classList.remove("hovered-city");
            });
        
            searchHistorycontainer.appendChild(cityDiv);

        }
    }

    // Allows the serach button to be used on click
searchButton.addEventListener("click", search);
