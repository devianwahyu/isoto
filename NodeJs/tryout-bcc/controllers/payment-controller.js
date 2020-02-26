const db = require('../database')

module.exports = {
    tryoutPayment: async (req, res, next) => {
        const questionType = req.body.questionType
        const nominal = req.body.bayar
        try {
            if (nominal == 25000) {
                db.query('UPDATE `AKUN` SET `STATUS_BAYAR`= 1,`ID_TIPE_SOAL`= ? WHERE ID = ?', [questionType, req.user.id])
                res.status(200).json({
                    "success": true,
                    "message": "Payment successful"
                })
            } else {
                res.status(402).send('Payment is required')
            }
        } catch (e) {
            next(e)
        }
    },

    upgradePayment: async (req, res, next) => {
        const nominal = req.body.bayar
        try {
            if (nominal == 200000) {
                db.query('UPDATE AKUN SET ID_TIPE_MEMBER = 3 WHERE ID = ?', [req.user.id])
                res.status(200).json({
                    "success": true,
                    "message": "Payment successful"
                })
            } else {
                res.status(402).send('Payment is required')
            }
        } catch (e) {
            next(e)
        }
    },
}