const request = require('request');

// darksky api with lat and long
const forecast = (address, lat, long, callback) => {
    const darkURL = `https://api.darksky.net/forecast/847db15d940a551e4177f04257e505f7/${lat},${long}`;

    request({ url: darkURL, json: true }, function(err, response) {
        if (err) 
            callback('Unable to connect to darksky API.', undefined);
        else if (response.body.error) {
            callback('Unable to find location.', undefined);
        } else {
            var currentTemp = response.body.currently.apparentTemperature;
            var precipChance = response.body.currently.precipProbability;
            callback(undefined, `${address}: ${response.body.daily.data[0].summary} Currently, it is ${currentTemp} degrees. There is a ${precipChance}% chance of rain.`);
        }
    });
}

module.exports = forecast;