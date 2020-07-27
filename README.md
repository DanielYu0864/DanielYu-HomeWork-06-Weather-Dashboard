# 06 Server-Side APIs: Weather Dashboard

![Image of Yaktocat](./img/Screenshot(6).png)

## Weather Dashboard explain

* This is a sample weather dashboard
- The current weather dashboard includes the `temperature`,` icon` representation of weather conditions, `humidity`, the `wind speed`, and the `UV index`.
- When the city time is `day`, then the dashboard will display ![image](./img/day_image.svg).
- When the city time is `night`, then the dashboard will display ![image](./img/night_image.svg).
- When you type the city of you want in the `search` input, then the browser will display that the city's current weather and next 5 days forecast weather.
- When you search for the next city, then the browser displays the `search history` on the `left column`.
- When you click the `clear history` button, then the browser clears the search history.

### What I did

1. HTML
    * `div.container` to contain main weather dashborad.
    * `div.search-history` to contain `search history` and `clear history` button.
    * `div#five-day-forecast-container` to contain `forecast weather`.
2. CSS
    * [`bootstrap`](https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css) to adjust the basic position and styling.
3. Javascript
    * [`jQuery`](https://jquery.com/) to get the `UV idex` data.
    * `request.js` file for fetch the api key and api URL.
    * Use [`OpenweatherAPI`](https://api.openweathermap.org) to get the weather data.
    * `script.js` file for main function( Weather dashboard, forecast weather,and search history) and event listener.

- - -
© 2020 Daniel Yu