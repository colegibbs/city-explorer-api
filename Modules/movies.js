'use strict';

const axios = require('axios');

async function getMovies(req, res) {
  try{
    let city = req.query.city;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
    let movieData = await axios.get(url);
    let selectedData = movieData.data.results.map(movieObj => new Movie(movieObj));
    let names = selectedData.map(movie => movie.name);
    res.send(names);
  }
  catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    })
  }
}

class Movie {
  constructor(movieObj) {
    this.name = movieObj.original_title;
  }
}

module.exports = getMovies;