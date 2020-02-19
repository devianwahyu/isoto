const db = require('../database')

module.exports = {
    addQuestion: (req, res, next) => {
        const content = req.body.content
        const answer = req.body.answer
        const questionType = req.body.questionType
        try {
            if (req.user.ID_TIPE_MEMBER == 1) {
                db.query('INSERT INTO SOAL(KONTEN, JAWABAN, ID_TIPE_SOAL) VALUES(?, ?, ?)', [content, answer, questionType])
                res.status(200).json({
                    "success": true,
                    "message": "Question added successfuly"
                })
            } else {
                res.status(403).send("You're not admin")
            }
        } catch (e) {
            next(e)
        }
    },

    updateQuestion: async (req, res, next) => {
        const id = req.body.id
        const content = req.body.content
        const answer = req.body.answer
        const questionType = req.body.questionType
        try {
            if (req.user.ID_TIPE_MEMBER == 1) {
                db.query('UPDATE SOAL SET KONTEN = ?, JAWABAN = ?, ID_TIPE_SOAL = ? WHERE ID = ?', [content, answer, questionType, id])
                req.status(200).json({
                    "success": true,
                    "message": "Question updated successfuly"
                })
            } else {
                res.status(403).send("You're not admin")
            }
        } catch (e) {
            next(e)
        }
    },

    deleteQuestion: async (req, res, next) => {
        const id = req.params.id
        try {
            if (req.user.ID_TIPE_MEMBER == 1) {
                db.query('DELETE FROM SOAL WHERE ID = ?', [id])
                req.status(200).json({
                    "success": true,
                    "message": "Qusetion deleted successfuly"
                })
            } else {
                res.status(403).send("You're not admin")
            }
        } catch (e) {
            next(e)
        }
    },

    getQuestionByType: async (req, res, next) => {
        const id = req.params.id
        try {
            if (req.user.id_tipe_member == 1) {
                const [rows] = await db.query('SELECT * FROM SOAL WHERE ID_TIPE_SOAL = ?', [id])
                res.status(200).json({
                    "success": true,
                    "data": rows
                })
            } else {
                res.status(403).send("You're not admin")
            }
        } catch (e) {
            next(e)
        }
    },

    getAllQuestion: async (req, res, next) => {
        try {
            if (req.user.id_tipe_member == 1) {
                const [rows] = await db.query('SELECT * FROM SOAL')
                res.status(200).json({
                    "success": true,
                    "data": rows
                })
            } else {
                res.status(403).send("You're not admin")
            }
        } catch (e) {
            next(e)
        }
    },

    getAllMember: async (req, res, next) => {
        try {
            if (req.user.id_tipe_member == 1) {
                const [rows] = await db.query('SELECT * FROM AKUN')
                res.status(200).json({
                    "success": true,
                    "data": rows
                })
            } else {
                res.status(403).send("You're not admin")
            }
        } catch (e) {
            next(e)
        }
    },

    updatePaymentStatusMember: async (req, res, next) => {
        try {
            if (req.user.id_tipe_member == 1) {
                db.query('UPDATE AKUN SET STATUS_BAYAR = 0 WHERE 1')
                res.status(200).json({
                    "success": true,
                    "message": "Payment status updated successfuly"
                })
            } else {
                res.status(403).send("You're not admin")
            }
        } catch (e) {
            next(e)
        }
    }
}