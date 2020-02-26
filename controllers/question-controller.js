const db = require('../database')

module.exports = {
    tryout: async (req, res, next) => {
        const type = req.user.tipe_soal
        try {
            const [soal] = await db.query('select id, konten, opsi_a, opsi_b, opsi_c, opsi_d from sol where id_tipe_soal = ?', [type])
            res.status(200).json({
                "status": true,
                "data": soal
            })
        } catch (e) {
            next(e)
        }
    },

    pembobotan: async (req, res, next) => {
        var correctAnswer = []
        const idSoal = req.params.id
        const answer = req.body.answer
        try {
            const [check] = await db.query('select jawaban from soal where id = ?', [idSoal])
            if (answer == check[0].jawaban) {
                correctAnswer.push(answer)
                res.json({
                    "data": correctAnswer
                })
            } else {
                res.json({
                    "status": false
                })
            }

        } catch (e) {
            next(e)
        }
    },

    postFinish: async (req, res, next) => {
        const username = req.user.username
        try {
            db.query('update akun set status_kerja = 0 where id = ?', [username])
        } catch (e) {
            next(e)
        }
    }
}