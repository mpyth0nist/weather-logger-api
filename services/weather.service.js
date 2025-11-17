const fs = require('fs').promises
const path = require('path')

let weatherData;

// Pagination system.


const filterByParams = (data, query, startIndex, endIndex) => {

    let queryKeys = Object.keys(query)
    let citiesData = data;
    if (queryKeys.includes('minTemp')){
        citiesData = citiesData.filter(city => filterByMinTemp(city.tempC, query['minTemp']))
        queryKeys = queryKeys.filter(key => key !== 'minTemp')
    }
    if(queryKeys.includes('maxTemp')){
        citiesData = citiesData.filter(city => filterByMaxTemp(city.tempC, query['maxTemp']))
        queryKeys = queryKeys.filter(key => key !== 'maxTemp')

    }

    if(queryKeys.includes('conditions')){
        citiesData = citiesData.filter(city => filterByConditions(city.conditions, query['conditions'].split(',')))
    }

    else {
        citiesData = citiesData.filter(element => queryKeys.filter(key => key !== 'page' && key !== 'limit').every((key) => query[key] == element[key]))
    }
    
    let paginatedFilteredData = citiesData.slice(startIndex, endIndex)
    console.log('paginated data:', paginatedFilteredData)

    return paginatedFilteredData

}

const filterByMinTemp = (temp, minTemp) => {

    return temp >= minTemp

}

const filterByMaxTemp = (temp, maxTemp) => {

    return temp <= maxTemp


}

const filterByConditions = (condition, conditions) => {
    
    return conditions.includes(condition)
}


const getAllWeatherData = async (query) => {
    if(!weatherData){
        try {
        
        const filePath = path.join(__dirname, '../data/weather.json')
        const data = await fs.readFile(filePath, 'utf8')
        weatherData = JSON.parse(data)
        } catch(err){
            throw new Error (`${err.message}`)
        }
    } 


    const page = parseInt(query.page) || 1
    const limit = parseInt(query.limit) || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    let paginatedData = weatherData.slice(startIndex, endIndex)
    if(Object.keys(query).length === 0 ){
        return paginatedData
    }else {
        return filterByParams(weatherData, query, startIndex, endIndex)
    }


}

const getCityById = async (id) => {

    try{
        const filePath = path.join(__dirname, '../data/weather.json')
        const data = await fs.readFile(filePath, 'utf8')
        const parsedData = JSON.parse(data)
        const cityWeatherData = parsedData.filter(city => {
            return city.id === parseInt(id)
        })
        return cityWeatherData
    }catch(err){
        throw new Error (`${err.message}`)
    }
}

const formatToND = async () => {
    try {
        const filePath = path.join(__dirname, '../data/weather.json')
        const data = await fs.readFile(filePath, 'utf8')

        const formatted = JSON.parse(data).map(item => JSON.stringify(item)).join('\n')
        return formatted
    }catch(err){
        throw new Error(`${err.message}`)
    }
}



module.exports = {
    getAllWeatherData,
    getCityById,
    formatToND
}
