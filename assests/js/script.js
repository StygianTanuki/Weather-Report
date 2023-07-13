var APIKey = "cf9803c3b377a9b6c5550c2755ccbd51";
var searchButton = document.getElementById("search-button");
var cityLocation = document.getElementById("search-city");
var weatherBlock = document.getElementById("current-weather");
var fiveDayblock = document.getElementById("five-day");
var searchHistorycontainer = document.getElementById("search-history");

function search() {
    var content = cityLocation.value;
    console.log(content);

    var url = "https://api.openweathermap.org/data/2.5/forecast?" + content + "&appid=" + APIKey + "&units=imperial";


    weatherBlock.innerHTML = "";
    fiveDayblock.innerHTML = "";

    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){ 
        console.log(data);

        var currentDay = data.list[0];
        var currentDate = new Date();
        var cityName = data.city.name;

        var cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "mx-auto");



        var cardBody = document.createElement("div");
        cardBody.classList.add("cardBody", 'bg-success');

        var cardTitle = document.createElement("h1");
        cardTitle.classList.add("card-title");
        var icon = document.createElement("i");
        icon.classList.add("fas", "fa-calendar-alt");

        var currentDateText = document.createElement("span");
        currentDateText.textContent = "Current Date: " + currentDate.toDateString();

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

        cardDiv.appendChild(cardBody);
        weatherBlock.appendChild(cardDiv);

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
            sectionBlock.classList.add("card", "col");
            var dateH3 = document.createElement("h3");
            dateH3.textContent = formatDateString(fiveDay[i].dt_txt);


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

            ulNew.appendChild(tempLi);
            ulNew.appendChild(windLi);
            ulNew.appendChild(humidityLi);

            sectionBlock.appendChild(dateH3);
            sectionBlock.appendChild(ulNew);

            fiveDayblock.appendChild(sectionBlock);
        }

        localCity(content);
        searchHistory();
    });
}

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

    function formatDateString(dateString) {
        var date = new Date(dateString);
        var formattedDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
        return formattedDate;
    }

    function localCity(city) {
        var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
        searchHistory.unshift(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }

    function displaySearch() {
        var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
        var searchHistorycontainer = document.getElementById("search-history");
        searchHistorycontainer.innerHTML = "";

        for (var i = 0; i < searchHistory.length; i++) {
            var cityDiv = document.createElement("div");
            cityDiv.classList.add("searched-city");
            cityDiv.textContent = searchHistory[i];

            cityDiv.addEventListener("click", function (event) {
                var cityName = event.target.textContent;
                searchCity.value = cityName;
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

searchButton.addEventListener("click", search);
