const express = require('express')
const { fetchWeatherData } = require('../controllers/weather.controller')
const router = express.Router()

router.get('/', fetchWeatherData)


module.exports = router
