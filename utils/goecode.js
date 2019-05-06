const request = require('request');

const geocode = (address, callback) => {
    const mapboxKey = 'pk.eyJ1IjoicmljaGFyZGs3MCIsImEiOiJjanY1c2x1b24wancwNGRvMDE4YW13dWs4In0.ClHNETNBPxTrF4aFHLVaDg';
    const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxKey}&limit=1`;

    request({ url: geoURL, json: true }, (err, response) => {
    if (err)
        callback('Unable to connect to mapbox URL.', undefined);
    else if (response.body.features.length == 0)
        callback('Given location is invalid.', undefined);
    else {
        const lat = response.body.features[0].center[1];
        const long = response.body.features[0].center[0];
        callback(undefined, { lat, long, address });
    }
});
}

module.exports = geocode;