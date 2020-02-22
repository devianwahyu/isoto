require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const router = require('./routers')
require('./database')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')

app.use('/', router)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => { console.log('Server running on port', PORT) })