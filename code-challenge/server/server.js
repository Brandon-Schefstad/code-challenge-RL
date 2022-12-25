const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('express-flash')

const indexRoutes = require('./routes/index.js')
const todoRoutes = require('./routes/todo.js')
app.use(flash())
app.use(bodyParser.json())
require('dotenv').config({ path: '.env' })
app.listen(process.env.PORT || 8000, () => {
	console.log(`http://localhost:${process.env.PORT}`)
})

/**Session configs */
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI,
		}),
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
)
require('./middleware/passport')(passport)
/**Passport Middleware*/
app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride('_method'))
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI)
		console.log(`MongoDB Connected: ${conn.connection.host}`)
	} catch (err) {
		console.error(err)
		process.exit(1)
	}
}
/**Passport */

connectDB()
app.use('/', indexRoutes)
app.use('/todo', todoRoutes)
