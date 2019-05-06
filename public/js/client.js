const lat = '-112';
const long = '71';

const URL = `https://api.darksky.net/forecast/847db15d940a551e4177f04257e505f7/${lat},${long}`;

fetch('URL')
.then( (res) => {
    res.json().then( (data) => {
        console.log(data);
    });
});