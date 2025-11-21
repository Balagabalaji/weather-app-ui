//note:this api is only for list of cities in a country
//if u want country u have to go for other api which have country level data
/* OpenWeatherMap API successfully returns weather data for certain countries like "America," "Italy," or others, it is likely because there are cities or locations with those names in its database*/

const cityInput = document.querySelector('.input');
const button = document.getElementById('button');
const temperature = document.getElementById('temperature');
const cityname = document.getElementById('cityname');
const humidity = document.querySelectorAll('.hm')[0];
const windspeed = document.querySelectorAll('.ws')[0];
const weathericon = document.querySelector('.weathericon');
const toast = document.getElementById('toast');

const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const apikey = "44ade95c1c42c8d86639740e961831fc";

// Async function to fetch weather...
async function weatherCheck(cityName) {
    const response = await fetch(`${apiurl}&q=${cityName}&appid=${apikey}`);
    const data = await response.json();
    return data;
}

// Show toast
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// click buttton
button.addEventListener('click', async function() {
    const cityVal = cityInput.value.trim();

    if (cityVal === "") {
        showToast("Enter city name");
        return;
    }

    try {
        const data = await weatherCheck(cityVal);

        if (data.cod === 200 && cityVal.toLowerCase() === data.name.toLowerCase()) {
            // Updating  weather information........
            temperature.textContent = Math.round(data.main.temp) + "°C";
            cityname.textContent = data.name;
            humidity.textContent = data.main.humidity + "%";
            windspeed.textContent = data.wind.speed + " km/h";

            // Updating  icon according weather conditions
            switch(data.weather[0].main) {
                  case 'Rain':
                    weathericon.src = 'images/rain.png'; break;
              case 'Clear':
             weathericon.src = 'images/clear.png'; break;
                case 'Mist':
                    weathericon.src = 'images/mist.png'; break;
           case 'Clouds':
                    weathericon.src = 'images/clouds.png'; break;
                
                
            case 'Snow':
                    weathericon.src = 'images/snow-96.png'; break;
                case 'Drizzle':
                    weathericon.src = 'images/drizzle.png'; break;
                default:
                    weathericon.src = 'images/weather.png';
            }

            cityInput.value = ""; // Clearing the  input value
        } else {
            showToast("Invalid city name");
            cityInput.value = '';
        }
    } catch (error) {
        console.error(error);
        showToast("Something went wrong!");
    }
});



 

 
