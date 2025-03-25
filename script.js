//note:this api is only for list of cities in a country
//if u want country u have to go for other api which have country level data
/* OpenWeatherMap API successfully returns weather data for certain countries like "America," "Italy," or others, it is likely because there are cities or locations with those names in its database*/
let city=document.querySelector('.input')

 let button=document.getElementById('button')

 let temperature=document.querySelector('#temperature')

 let cityname=document.querySelector("#cityname")

let humidity=document.querySelectorAll('.hm')[0]

let windspeed=document.querySelectorAll('.ws')[0]

let weathericon=document.querySelector('.weathericon')
//to give promise we will give async
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric";
const apikey="44ade95c1c42c8d86639740e961831fc"
 async function weathercheck(cityName){
       const response= await fetch(apiurl +`&q=${cityName}` +`&appid=${apikey}`)
       const data=await response.json()
       return data
 }
button.addEventListener('click', async function(){
   const data =await weathercheck(city.value.trim())
   console.log(data)
   if(city.value ==""){
      alert("Enter city name")
      return;
   }
   
   try{
   if (data.cod === 200){
      
   

if(city.value.toLowerCase()==data.name.toLowerCase()){
      
      temperature.innerHTML=Math.round(data.main.temp) +"°C"
      cityname.innerHTML=city.value
      humidity.innerHTML=data.main.humidity + "%"
      windspeed.innerText=data.wind.speed +"km/h"
      if(data.weather[0].main=='Rain'){
           weathericon.src='images/rain.png'
      }else if(data.weather[0].main=='Clear'){
           weathericon.src='images/clear.png'
      }else if(data.weather[0].main=='Mist'){
             weathericon.src='images/mist.png'
      }else if(data.weather[0].main=='Clouds'){
            weathericon.src='images/clouds.png'
      }else if(data.weather[0].main=='Snow'){
            weathericon.src='images/snow-96.png'
      }
      else if(data.weather[0].main=='Drizzle'){
            weathericon.src='images/drizzle.png'
      }else{
            weathericon.src='images/weather.png'
      }

      city.value=""//making input field empty after search
}
}else{
      alert("Invalid city name")
      city.value=''
}
   }catch(error){
      console.error(error)
      alert('Enter only specific city name')
   }

}

)
 
 