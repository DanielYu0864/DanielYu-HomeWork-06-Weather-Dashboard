// const apiKey = "e93223a6b1823d41860077c8e54b5206";

// giving the variable
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


// turn kelvin to celcius
function spitOutCelcius(kelvin) {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
}
// check time to display background
function isDayTime(icon) {
    if (icon.includes("d")) { return true }
    else { return false }
}


// function to get input value and call the display function
function searchCity(event) {
    event.preventDefault();
    const citySearched = cityValue.value.trim();
    console.log(citySearched);
    searchForm.reset();
    // *fetch version
    requestCity(citySearched).then((data) => {
        undateWeatherApp(data);
    }).catch((error) => {
        console.log(error);
    })

    // *.ajax version
    // $.ajax({
    //     url:`https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&appid=${apiKey}`,
    //     method: "GET"
    // }).then(function(data) {
    //     undateWeatherApp(data);
    // })

    let citysList = JSON.parse(localStorage.getItem("cityName"));
    loadlastCity(citysList)
}
// function to display weather
function undateWeatherApp(city) {
    console.log(city);
    const imageName = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`

    cityName.textContent = city.name;
    $(".current-data").html((new Date(city.dt)).toString());
    $(".tempC").html(`${spitOutCelcius(city.main.temp)}&deg;C`);
    $(".condition").html(city.weather[0].description);
    $(".icon").attr("src", iconSrc);
    $(".wind-speed").html(`${city.wind.speed} m/s`);
    $(".humidity").html(`${city.main.humidity}%`);
    // call uv
    getUVIndex(city);

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

// function to call and run forecast
function forecast(cityid){
    // *fetch version
    requestForecastCity(cityid)
    .then((data) => {
        displayForecastWeather(data);
    })
    .catch((error) => {
        console.log(error);
    })

    // * .ajax version
    // const queryforecastURL="https://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&appid=" + apiKey;
    // $.ajax({
    //     url:queryforecastURL,
    //     method:"GET"
    // }).then((data) => {
    //      displayForecastWeather(data);
    // });
}

// function to display forecast weather
function displayForecastWeather(response) {
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
}

// function to add the search history list button
function addToList(c) {
    let listEl = $("<button>"+ c +"</button>");
    $(listEl).addClass("list-group-item shadow-sm");
    $(listEl).attr("data-value",c);
    $(".list-group").append(listEl);
}
// function to get the local storage and add button list
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
// function to run search history
function PastSearch(event){
    event.preventDefault();
    let liEl = event.target;

    if (event.target.matches(".list-group-item")) {
        city = liEl.textContent.trim();
        console.log(city);
        // *fetch version
        requestCity(city)
        .then((data) => {
            undateWeatherApp(data);
        })
        .catch((error) => {
            console.log(error);
        })

        // *.ajax version
        // $.ajax({
        //     url:`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
        //     method: "GET"
        // }).then(function(data) {
        //     undateWeatherApp(data);
        // })
    }
}

// function to clear the history div
function clearHistory(event){
    event.preventDefault();
    citys = [];
    localStorage.clear();
    document.location.reload();

}

// function to add UVI
function getUVIndex(response) {
    // uv api url
    const uviAPI = "https://api.openweathermap.org/data/2.5/uvi?lat=";
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var uviQueryURL = `${uviAPI}${lat}&lon=${lon}&appid=${apiKey}`;
    $.ajax({
        url: uviQueryURL,
        method: "GET"
      }).then(function(uviResponse) {
        var uviResults = uviResponse;
        var uvi = uviResults.value;
        $(".uv-index").html(uvi);

        // DRY this out...
        if (uvi < 3) {
          $(".uv-badge").css("background-color", "green");
        } else if (uvi < 6) {
          $(".uv-badge").css("background-color", "yellow");
        } else if (uvi < 8) {
          $(".uv-badge").css("background-color", "orange");
        } else if (uvi < 11) {
          $(".uv-badge").css("background-color", "red");
        } else {
          $(".uv-badge").css("background-color", "purple");
        }
      });
}


// event listener
$(document).on("click",".list-group-item", PastSearch);
$(searchForm).on("submit", searchCity);
$(window).on("load", loadlastCity());
$("#clear-history").on("click",clearHistory);