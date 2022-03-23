'use strict';
console.log('My first server');

//REQUIRE
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');
const { response } = require('express');

//USE
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

//ROUTES
app.get('/weather', (req, res) => {
  try {
    let city = req.query.searchQuery;
    let cityObj = data.find(weatherCity => weatherCity.city_name === city);
    let selectedData = cityObj.data.map(curr => new Forecast(curr));
    res.send(selectedData);
  }
  catch (error) {
    next(error);
  }
});

app.get('*', (req, res) => {
  response.send('What you are looking for doesn\'t exist.');
})

//ERRORS
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

//CLASSES
class Forecast {
  constructor(cityObj) {
    this.date = cityObj.valid_date;
    this.description = cityObj.weather.description;
  }
}

//LISTEN
app.listen(PORT, () => console.log(`listinging on ${PORT}`));