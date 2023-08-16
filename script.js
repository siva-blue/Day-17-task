const url = "https://restcountries.com/v3.1/all";

function fetchCountries(url) {
  fetch(url)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Request failed");
      }
    })
    .then(function(data) {
      displayCountries(data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function displayCountries(data) {
  const countriesWithLowPopulation = data.filter(function(country) {
    return country.population < 200000;
  });

  const countriesDiv = document.getElementById("countries");

  countriesWithLowPopulation.forEach(function(country) {
    const countryCard = document.createElement("div");
    countryCard.className = "card";

    let cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    cardHeader.textContent = country.name.common;
    countryCard.appendChild(cardHeader);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let capital = document.createElement("p");
    capital.textContent = `Capital: ${country.capital}`;
    cardBody.appendChild(capital);

    let region = document.createElement("p");
    region.textContent = `Region: ${country.region}`;
    cardBody.appendChild(region);

    let flag = document.createElement("img");
    flag.src = country.flags.png;
    flag.alt = `Flag of ${country.name.common}`;
    cardBody.appendChild(flag);

    let countryCodes = document.createElement("p");
    countryCodes.textContent = `Country Codes: ${JSON.stringify(country.cca2)}, ${JSON.stringify(country.cca3)}`;
    cardBody.appendChild(countryCodes);

    let weatherButton = document.createElement("button");
    weatherButton.className = "btn btn-primary";
    weatherButton.textContent = "Click for weather";
    
    let latlngDisplay = document.createElement("p");
    latlngDisplay.id = `latlng-${country.cca3}`; 
    latlngDisplay.style.display = "none";
    cardBody.appendChild(latlngDisplay);

    let showLatlng = false; 
    weatherButton.addEventListener("click", function() {
      showLatlng = !showLatlng; 
      if (showLatlng) {
        weatherButton.textContent = `Latitude: ${country.latlng[0]}, Longitude: ${country.latlng[1]}`;
      } else {
        weatherButton.textContent = "Click for weather";
      }
      getWeather(country.latlng[0], country.latlng[1]); 
    });
    
    cardBody.appendChild(weatherButton);

    countryCard.appendChild(cardBody);
    countriesDiv.appendChild(countryCard);
  });
}

function getWeather(lat, lon) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY`;
  

  fetch(weatherUrl)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Weather request failed");
      }
    })
    .then(function(weatherData) {
      
      console.log(weatherData);
    })
    .catch(function(error) {
      console.log(error);
    });
}

fetchCountries(url);