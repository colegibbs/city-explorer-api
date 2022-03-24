'use strict';
console.log('My first server');

//REQUIRE
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');
// const { response } = require('express');

//USE
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

//ROUTES
app.get('/weather',  async (req, res) => {
  try {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&units=I&lat=${lat}&lon=${lon}&days=3`;
    let weatherData = await axios.get(url);
    console.log(weatherData.data);
    // let cityObj = data.find(weatherCity => weatherCity.city_name === city);
    let selectedData = weatherData.data.data.map(curr => new Forecast(curr));
    res.send(selectedData);
  }
  catch (error) {
    next(error);
  }
});

app.get('movies', async (req, res) => {
  try{
    let city = req.query.city;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city}`;
    let movieData = await axios.get(url);
    let selectedData = movieData.data.results.map(movieObj => new Movie(movieObj));
    res.send(selectedData);
  }
  catch (error) {
    next(error);
  }
})

app.get('/*', (req, res) => {
  res.send('What you are looking for doesn\'t exist.');
})

//ERRORS
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

//CLASSES
class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.valid_date;
    this.description = weatherObj.weather.description;
  }
}

class Movie {
  constructor(movieObj) {
    this.name = movieObj.original_title;
  }
}

//LISTEN
app.listen(PORT, () => console.log(`listinging on ${PORT}`));