const db = require('../database')

module.exports = {
    getProfil: async (req, res, next) => {
        const id_user = req.user.username
        try {
            const queryGetData = `
            select username, email, prodi, universitas, tipe_member 
            from akun a 
            inner join universitas u 
            on a.id_universitas = u.id 
            inner join prodi p on a.id_prodi = p.id 
            inner join tipe_member tm 
            on a.id_tipe_member = tm.id 
            where username = ?`

            const [getData] = await db.query(queryGetData, [id_user])

            res.status(200).json({
                "success": true,
                "data": getData[0]
            })
        } catch (e) {
            next(e)
        }
    },

    pilihUnivDepart: (req, res, next) => {
        const id_user = req.user.username
        const universitas = req.body.universitas
        const prodi = req.body.prodi
        try {
            db.query('update akun set id_universitas = ?, id_prodi = ? where username = ?', [universitas, prodi, id_user])

            res.status(200).json({
                "success": true,
                "message": "Berhasil memilih universitas dan prodi"
            })
        } catch (e) {
            next(e)
        }
    },

    hapusAkun: (req, res, next) => {
        const id_user = req.user.username
        try {
            db.query('delete from akun where username = ?', [id_user])

            res.status(200).json({
                "success": true,
                "message": "Akun berhasil dihapus"
            })
        } catch (e) {
            next(e)
        }
    }
}