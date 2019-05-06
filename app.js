const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');

const geocode = require('./utils/goecode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

// template engine
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs');

// static files in the Public folder
app.use(express.static(path.join(__dirname, './public')));

// ROUTES /////////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Richard'
    });
});

// send back JSON
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
    });
});

app.get('/forecast', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Supply an address.'
        });
    }
    geocode(req.query.address, (err, data) => {
        if (err) 
            return res.send( err );
        else {
            forecast(data.place, data.lat, data.long, (err, forecast) => {
                if (err)
                    return res.send(err);
                res.send({
                    forecast: forecast,
                    location: data.address
                });
            });
        }
    });
});

app.post('/forecast', (req, res) => {
    console.log(req.body);

});

// 404 page (for not found routes)
app.get('/help/*', function(req, res) {
    res.render('lost', {
        title: '404 Not found',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', function(req, res) {
    res.render('lost', {
        title: '404 Not found',
        errorMessage: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log('Listening port ' + port + '...');
});
    