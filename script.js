const apiKey = "e93223a6b1823d41860077c8e54b5206";

const searchForm = document.querySelector(".search-loaction");
const cityValue = document.querySelector(".search-loaction input");
const cityName = document.querySelector(".city-name p");
const cardBody = document.querySelector(".card-body");
const timeImage = document.querySelector(".card-top img");
const cardInfo = document.querySelector(".back-card");
const cardFInfo = document.querySelector(".forecast-container")
let listBtnEl = document.querySelector(".list-group-item");
let citys = [];
let city="";


function addToList(c) {
    let listEl = $("<button>"+ c +"</button>");
    $(listEl).addClass("list-group-item shadow-sm");
    $(listEl).attr("data-value",c);
    $(".list-group").append(listEl);
}

function loadlastCity(){
    $("ul").empty();
    let citysList = JSON.parse(localStorage.getItem("cityName"));
    console.log(citysList);
    if(citysList!==null){
        for(i=0; i<citysList.length;i++){
            addToList(citysList[i]);
        }
    }
}


function spitOutCelcius(kelvin) {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
}

function isDayTime(icon) {
    if (icon.includes("d")) { return true }
    else { return false }
}

function forecast(cityid){
    const queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&appid=" + apiKey;
    $.ajax({
        url:queryforcastURL,
        method:"GET"
    }).then(function(response){

        for (i=0;i<5;i++){
            let date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            let iconcode= response.list[((i+1)*8)-1].weather[0].icon;
            let iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
            let tempK= response.list[((i+1)*8)-1].main.temp;
            let tempC=spitOutCelcius(tempK).toFixed(0);
            let humidity= response.list[((i+1)*8)-1].main.humidity;

            $("#fDate"+i).html(date);
            $("#fImg"+i).html("<img src="+iconurl+">");
            $("#fTemp"+i).html(` ${tempC}&deg;C`);
            $("#fHumidity"+i).html(` ${humidity}%`);
            cardFInfo.classList.remove("display-none");
        }

    });
}


function undateWeatherApp(city) {
    console.log(city);
    const imageName = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`

    cityName.textContent = city.name;
    $(".current-data").html((new Date(city.dt)).toString());
    $(".tempC").html(`${spitOutCelcius(city.main.temp)}&deg;C`);
    $(".condition").html(city.weather[0].description);
    $(".high").html(`${spitOutCelcius(city.main.temp_max)}&deg;C`);
    $(".low").html(`${spitOutCelcius(city.main.temp_min)}&deg;C`);
    $(".icon").attr("src", iconSrc);
    $(".wind-speed").html(`${city.wind.speed} m/s`);
    $(".humidity").html(`${city.main.humidity}%`);

    if (isDayTime(imageName)) {
        console.log("day");
        timeImage.setAttribute("src", "img/day_image.svg");
        if (cityName.classList.contains("text-white")) {
            cityName.classList.remove("text-white");
        } else {
            cityName.classList.add("text-black");
        }
    } else {
        console.log("night");
        timeImage.setAttribute("src", "img/night_image.svg");
        if (cityName.classList.contains("text-black")) {
            cityName.classList.remove("text-black");
        } else {
            cityName.classList.add("text-white");
        }
    }
    forecast(city.id);
    citys.push(city.name);
    console.log(citys);
    localStorage.setItem("cityName", JSON.stringify(citys));
    cardInfo.classList.remove("display-none");
}


const requestCity = async (cityName) => {
    const baseWeatherURL = "https://api.openweathermap.org/data/2.5/weather";
    const query = `?q=${cityName}&appid=${apiKey}`;
    // make fetch call (promise call)
    const response = await fetch(baseWeatherURL + query);
    // promise data
    const data = await response.json();
    return data;
}

function PastSearch(event){
    event.preventDefault();
    let liEl = event.target;

    if (event.target.matches(".list-group-item")) {
        city = liEl.textContent.trim();
        console.log(city);
        requestCity(city).then((data) => {
            undateWeatherApp(data);
        }).catch((error) => {
            console.log(error);
        })
    }

}


function clearHistory(event){
    event.preventDefault();
    citys = [];
    localStorage.clear();
    document.location.reload();

}


function searchCity(event) {
    event.preventDefault();
    const citySearched = cityValue.value.trim();
    console.log(citySearched);
    searchForm.reset();
    requestCity(citySearched).then((data) => {
        undateWeatherApp(data);
    }).catch((error) => {
        console.log(error);
    })
    let citysList = JSON.parse(localStorage.getItem("cityName"));
    loadlastCity(citysList)
}

$(document).on("click",".list-group-item", PastSearch);
$(searchForm).on("submit", searchCity);
$(window).on("load", loadlastCity());
$("#clear-history").on("click",clearHistory);