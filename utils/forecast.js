const request = require('request');

// darksky api with lat and long
const forecast = (place, lat, long, callback) => {
    const darkURL = `https://api.darksky.net/forecast/847db15d940a551e4177f04257e505f7/${lat},${long}`;

    request({ url: darkURL, json: true }, function(err, response) {
        if (err) 
            callback('Unable to connect to darksky API.', undefined);
        else if (response.body.error) {
            callback('Unable to find location.', undefined);
        } else {
            var currentTemp = Math.round(response.body.currently.apparentTemperature);
            var precipChance = response.body.currently.precipProbability;
            var tomorrow = response.body.daily.data[1].summary;
            var tomorrowHigh = Math.round(response.body.daily.data[1].temperatureHigh);
            callback(undefined, `${place}:<br>
            ${response.body.daily.data[0].summary} Currently, it is ${currentTemp} degrees. There is a ${precipChance}% chance of rain.<p>
            Tomorrow, expect ${tomorrow} with a high of ${tomorrowHigh}°.`);
        }
    });
}

module.exports = forecast;