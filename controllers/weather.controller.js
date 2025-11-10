const { getAllWeatherData } = require("../services/weather.service")


const fetchWeatherData = async (req, res) => {

    try {
        const weatherData = await getAllWeatherData(req.query)
        res.json(weatherData)
    }catch(err){
        return res.status(404).json({ message : err.message })
    }


}

module.exports = {
    fetchWeatherData
}