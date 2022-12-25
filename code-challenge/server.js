const express = require('express')
const app = express()

const indexRoutes = require('./routes/index.js')
require('dotenv').config({ path: '.env' })
app.listen(process.env.PORT || 3000, () => {
	console.log(`http://localhost:${process.env.PORT}`)
})
app.use(express.static(__dirname + '/views'))
app.get('/', indexRoutes)
