const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const indexRoutes = require('./routes/index.js')

app.use(bodyParser.json())
require('dotenv').config({ path: '.env' })
app.listen(process.env.PORT || 8000, () => {
	console.log(`http://localhost:${process.env.PORT}`)
})
// app.use(express.static(__dirname + '/views'))
app.use('/', indexRoutes)
