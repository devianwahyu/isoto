const db = require('../database')

module.exports = {
    getProfile: async (req, res, next) => {
        try {
            const [rows] = await db.query('SELECT A.NAMA, EMAIL, J.NAMA JURUSAN, U.NAMA UNIVERSITAS, TM.NAMA TIPE_MEMBER FROM AKUN A INNER JOIN UNIVERSITAS U ON A.ID_UNIVERSITAS = U.ID INNER JOIN JURUSAN J ON U.ID = J.ID_UNIVERSITAS INNER JOIN TIPE_MEMBER TM ON A.ID_TIPE_MEMBER = TM.ID WHERE A.ID = ?', [req.user.ID])
            res.status(200).json({
                "success": true,
                "data": rows[0]
            })
        } catch (e) {
            next(e)
        }
    },

    updateName: (req, res, next) => {
        const name = req.body.name
        try {
            db.query('UPDATE AKUN SET nama = ? WHERE ID = ?', [name, req.user.ID])
            res.status(200).json({
                "success": true,
                "message": "Name updated successfuly"
            })
        } catch (e) {
            next(e)
        }
    },

    insertSelection: (req, res, next) => {
        const universitas = req.body.universitas
        const jurusan = req.body.jurusan
        try {
            db.query('UPDATE AKUN SET ID_UNIVERSITAS = ?, ID_JURUSAN = ? WHERE ID = ?', [universitas, jurusan, req.user.ID])
            res.status(200).json({
                "success": true,
                "message": "Selection success"
            })
        } catch (e) {
            next(e)
        }
    },

    deleteAccount: (req, res, next) => {
        try {
            db.query('DELETE FROM AKUN WHERE ID = ?', [req.user.ID])
            res.status(200).json({
                "success": true,
                "message": "Account deleted successfuly"
            })
        } catch (e) {
            next(e)
        }
    }
}