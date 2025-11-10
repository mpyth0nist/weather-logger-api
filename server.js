const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')


app.use(express.json())
app.use(morgan('dev'))

const weatherRoutes = require('./routes/weather.routes')
app.use('/api/weather', weatherRoutes)

app.listen(process.env.PORT, () => {
    console.log(`The server is running on port: ${process.env.PORT}`)
})

