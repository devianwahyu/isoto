require('dotenv').config()

const express = require('express')
const router = require('./routers')

const app = express()
app.use(express.json())

// Check connection with db
require('./database')

app.use('/', router)

const PORT = process.env.PORT || 76
app.listen(PORT, () => { console.log(`Server Running on Port ${PORT} ...`) })

