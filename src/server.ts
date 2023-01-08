import authRouter from './authRouter'
import { prisma } from './db'
// @ts-ignore
import { ensureAuth } from './middleware/auth.js'
import router from './router'

const cors = require('cors')
const express = require('express')
const app = express()
require('dotenv').config({ path: './env' })

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

async function main() {
	app.use('/api', ensureAuth, router)
	app.use('/auth', authRouter)
	app.listen(2122, () => {
		console.log(`http://localhost:${2122}`)
	})
}

main()
	.catch((e) => {
		throw e
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
