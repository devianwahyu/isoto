const express = require('express')
const bodyParser = require('body-parser')
// const axios = require('axios').default;

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/user', (req, res) => {
    res.json({
        data:
            [{
                soal: "Siapa nama bapak kamu?",
                a: "Ucok",
                b: "Roy",
                c: "Jamet",
            },
            { soal: "Siapa nama ibu kamu?" },
            { soal: "Siapa nama kakak kamu?" },
            { soal: "Siapa nama adik kamu?" },
            { soal: "Siapa nama istri kamu?" },
            { soal: "Siapa nama paman kamu?" },
            { soal: "Siapa nama anak kamu?" },
            { soal: "Siapa nama bibi kamu?" },
            { soal: "Siapa nama teman kamu?" },
            { soal: "Siapa nama sapi kamu?" },
            { soal: "Siapa nama kuda kamu?" },
            { soal: "Siapa nama kelelawar kamu?" },
            { soal: "Siapa nama guru kamu?" },
            { soal: "Siapa nama dosen kamu?" },
            { soal: "Siapa nama babi kamu?" },
            { soal: "Siapa nama unta kamu?" },
            { soal: "Siapa nama rumah kamu?" },
            { soal: "Siapa nama kota kamu?" },
            { soal: "Siapa nama telur kamu?" },
            { soal: "Siapa nama labi-labi kamu?" },
            ]
    })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => { console.log('Server running on port', PORT) })