const db = require('../database')

module.exports = {
    bayarTryout: async (req, res, next) => {
        const tipeSoal = req.body.tipeSoal
        const nominal = req.body.bayar
        const id_user = req.user.username
        try {
            if (nominal == 15000) {
                const [getToKe] = await db.query('select to_ke from akun where username = ?', [id_user])
                let toKe = getToKe[0].to_ke + 1
                db.query('update akun set status_bayar = 1, to_ke = ?, id_tipe_soal = ? where username = ?', [toKe, tipeSoal, id_user])

                res.status(200).json({
                    "success": true,
                    "message": "Pembayaran berhasil"
                })
            } else {
                const err = new Error('Perlu membayar untuk akses')
                res.status(402)
                next(err)
            }
        } catch (e) {
            next(e)
        }
    },

    bayarUpgrade: async (req, res, next) => {
        const nominal = req.body.bayar
        const id_user = req.user.username
        try {
            if (nominal == 200000) {
                db.query('update akun set id_tipe_member = 3 where username = ?', [id_user])
                res.status(200).json({
                    "success": true,
                    "message": "Pembayaran berhasil"
                })
            } else {
                const err = new Error('Perlu membayar untuk akses')
                res.status(402)
                next(err)
            }
        } catch (e) {
            next(e)
        }
    },
}