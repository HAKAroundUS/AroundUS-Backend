const axios = require('axios')

const getCoords = async (city) => {
    const key = process.env.API_KEY
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`
    const { data } = await axios.get(url)
    console.log(data[0])
    return data? [data[0].lat, data[0].lon]:[]
}

module.exports = getCoords