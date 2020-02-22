const db = require('../database')

module.exports = {
    tryout: async (req, res, next) => {
        const type = req.user.tipe_soal
        const id = req.params.id
        try {
            var rows
            if (type == 1) {
                [rows] = await db.query('SELECT KONTEN FROM SOAL WHERE ID_TIPE_SOAL = ? AND ID = ?', [type, id])
            } else {
                [rows] = await db.query('SELECT KONTEN FROM SOAL WHERE ID_TIPE_SOAL = ? AND ID = ?', [type, id])
            }
            res.status(200).json({
                "success": true,
                "data": rows
            })
        } catch (e) {
            next(e)
        }
    }
}