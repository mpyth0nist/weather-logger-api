const fs = require('fs').promises
const path = require('path')

let weatherData;

const filterByParams = (data, query) => {

    let queryKeys = Object.keys(query)

    let filteredData = data.filter(element => queryKeys.every(key => query[key] == element[key]))
    
    return filteredData

}


const getAllWeatherData = async (query) => {

    if(!weatherData){
        try {
        const filePath = path.join(__dirname, '../data/weather.json')
        const data = await fs.readFile(filePath, 'utf8')
        weatherData = JSON.parse(data)
        return weatherData

        } catch(err){
            throw new Error (`${err.message}`)
        }
    } else {

        return filterByParams(weatherData, query)

    }


}

module.exports = {
    getAllWeatherData
}
