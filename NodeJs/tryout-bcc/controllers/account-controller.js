const db = require('../database')

module.exports = {
    getProfile: async (req, res, next) => {
        try {
            const [rows] = await db.query('SELECT A.USERNAME username, EMAIL email, J.NAMA jurusan, U.NAMA universitas, TM.NAMA tipe_member FROM AKUN A INNER JOIN UNIVERSITAS U ON A.ID_UNIVERSITAS = U.ID INNER JOIN JURUSAN J ON U.ID = J.ID_UNIVERSITAS INNER JOIN TIPE_MEMBER TM ON A.ID_TIPE_MEMBER = TM.ID WHERE A.USERNAME = ?', [req.user.username])
            res.status(200).json({
                "success": true,
                "data": rows[0]
            })
        } catch (e) {
            next(e)
        }
    },

    pilihUnivDepart: (req, res, next) => {
        const universitas = req.body.universitas
        const prodi = req.body.prodi
        try {
            db.query('UPDATE AKUN SET ID_UNIVERSITAS = ?, ID_JURUSAN = ? WHERE USERNAME = ?', [universitas, jurusan, req.user.username])
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
            db.query('DELETE FROM AKUN WHERE USERNAME = ?', [req.user.username])
            res.status(200).json({
                "success": true,
                "message": "Account deleted successfuly"
            })
        } catch (e) {
            next(e)
        }
    }
}