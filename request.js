// api key
const apiKey = "e93223a6b1823d41860077c8e54b5206";

// function to fetch current weather URL
const requestCity = async (cityName) => {
    const baseWeatherURL = "https://api.openweathermap.org/data/2.5/weather";
    const query = `?q=${cityName}&appid=${apiKey}`;
    // make fetch call (promise call)
    const response = await fetch((baseWeatherURL + query), { method: "GET" });
    // promise data
    const data = await response.json();
    return data;
}
// function to fetch forcast URL
const requestForecastCity = async (cityid) => {
    const queryforecastURL = "https://api.openweathermap.org/data/2.5/forecast";
    const query = `?id=${cityid}&appid=${apiKey}`;
    // make fetch call (promise call)
    const response = await fetch((queryforecastURL + query), {method: "GET"});
    // promise data
    const data = await response.json();
    return data;
}