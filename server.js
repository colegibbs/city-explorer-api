'use strict';
console.log('My first server');

//REQUIRE
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');

//USE
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

//ROUTES

//ERRORS

//LISTEN