require('dotenv').config()

const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
})

db.query('SELECT 1+1 AS RESULT', () => { console.log('Connected to database') })
module.exports = db