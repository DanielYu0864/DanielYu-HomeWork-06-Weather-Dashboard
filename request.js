// const apiKey = "e93223a6b1823d41860077c8e54b5206";

// const baseWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=seattle&appid=e93223a6b1823d41860077c8e54b5206"
// https://api.openweathermap.org/data/2.5/forecast?q=seattle&appid=e93223a6b1823d41860077c8e54b5206

// const requestCity = async (cityName) => {
//     const baseWeatherURL = "http://api.openweathermap.org/data/2.5/weather";
//     const query = `?q=${cityName}&appid=${apiKey}`;
//     // make fetch call (promise call)
//     const response = await fetch(baseWeatherURL + query);
//     // promise data
//     const data = await response.json();
//     return data;
// }


// const forecastCity = async (cityName) => {
//     const baseForcastURL = "https://api.openweathermap.org/data/2.5/forecast";
//     const query = `?id=${cityName}&appid=${apiKey}`;
//     // make fetch call (promise call)
//     const response = await fetch(baseForcastURL + query);
//     // promise data
//     const data = await response.json();
//     return data;
// }