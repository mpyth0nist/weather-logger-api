const express = require('express')
const { fetchWeatherData, fetchCityById, convertToND } = require('../controllers/weather.controller')
const router = express.Router()

router.get('/', fetchWeatherData)
router.get('/stream', convertToND)
router.get('/:id', fetchCityById)

module.exports = router
