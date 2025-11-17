const { getAllWeatherData, getCityById, formatToND } = require("../services/weather.service")
const cache = require('../cache')

const fetchWeatherData = async (req, res) => {

    try {
        const weatherData = await getAllWeatherData(req.query)
        res.json(weatherData)
    }catch(err){
        return res.status(404).json({ message : err.message })
    }


}

const fetchCityById = async (req, res) => {
    console.log(cache.size())
    if(cache.size() > 0){

        const data = cache.get(req.params.id)
        if(data){
            return res.status(200).json(data)
        }
    }

    try {

        
        const cityData = await getCityById(req.params.id)
        cache.put(req.params.id, cityData)
        res.status(200).json(cityData)
    }catch(err){
        return res.status(500).json({ message : err.message })
    }
}

const convertToND = async (req, res) => {
    try{
        const ndjson = await formatToND()
        res.setHeader('Content-Type', 'application/x-ndjson')
        console.log(ndjson)
        res.status(200).send(ndjson)
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}
module.exports = {
    fetchWeatherData,
    fetchCityById,
    convertToND
}