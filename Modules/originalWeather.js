'use strict';

const axios = require('axios');

async function getWeather (req, res) {
  try {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&units=I&lat=${lat}&lon=${lon}&days=3`;
    console.log(url);
    let weatherData = await axios.get(url);
    // let cityObj = data.find(weatherCity => weatherCity.city_name === city);
    let selectedData = weatherData.data.data.map(curr => new Forecast(curr));
    res.send(selectedData);
  }
  catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    })
  }
}

class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.valid_date;
    this.description = weatherObj.weather.description;
  }
}

module.exports = getWeather;