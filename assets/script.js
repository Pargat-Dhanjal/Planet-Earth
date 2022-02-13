var button=document.getElementById("Search-btn");
var input=document.querySelector('#Search-input');
var cityName=document.querySelector('#city-name');
var ddate=document.querySelector('#date');
var cardy=document.querySelector('.weather-card');
var divi = document.querySelector('.weather');
var title = document.querySelector('#title-texty')
var description=document.querySelector('#desc');
var temp=document.querySelector('.temp');
var altTemp=document.querySelector('#alt-temp');
var imgIcon=document.querySelector('#weather-icon');
var cityIcon=document.querySelector("#city-image");
var humidity=document.querySelector('#humidity');
var pressure=document.querySelector('#pressure');
var windSpeed=document.querySelector('#wind-speed');
// var x = window.matchMedia("(max-width: 500px)");

const API="ffd7df142fb459264875d8ece6acc273";
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const d = new Date();
let month = months[d.getMonth()];
let date=d.getDate();
let year=d.getFullYear();
function geolocation()
{
    fetch('//api.openweathermap.org/geo/1.0/direct?q='+input.value+'&limit=1&appid='+API+'')
        .then(response => response.json())
        .then(data => {
            cityName.innerHTML=data['0']['name'];
            var lat=data['0']['lat'];
            var long=data['0']['lon'];
            weather(lat,long)
        })

    .catch(err => alert("Wrong city name!"))
}

function weather(lat,long)
{
    fetch('//api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&exclude=minutely,hourly,daily&units=metric&appid='+API+'')
        .then(response => response.json())
        .then(data => {
        lat=data['lat']
        long=data['lon']
        divi.style.display="block"
        cardy.style.display="none"
        title.innerHTML=""
      
        
        ddate.innerHTML=date+" "+month+", "+year
        temp.innerHTML=data['current']['temp']+"° C"
        altTemp.innerHTML="Feels Like "+data['current']['feels_like']+"° C"
        var icon=data['current']['weather']['0']['icon']
        var desc=data['current']['weather']['0']['main']
        humidity.innerHTML="Humidity- "+data['current']['humidity']+"%"
        pressure.innerHTML="Pressure- "+data['current']['pressure']+" hPa"
        windSpeed.innerHTML="Wind Speed- "+data['current']['wind_speed']+"m/s"
        imgIcon.src="//openweathermap.org/img/wn/"+icon+"@2x.png"
        // cityIcon.src="https://maps.googleapis.com/maps/api/place/photo?"+data['0']['name']

        description.innerHTML=desc
        // console.log(data)           
        })
    .catch(err => alert("Cannot find weather!"))
}
function titleRev(){
    // var txt="One Search away for all the weather information about your city.";
    // title.marginTop="30%"
    title.innerHTML="One Search away for all the weather information about your city.";
    cardy.style.display="block";
    divi.style.display="none";
    input.value="";
}

function enterChecker(e){
    if(e.keyCode==13){
        geolocation();
    }
}