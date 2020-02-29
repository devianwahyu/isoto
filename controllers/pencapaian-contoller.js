const db = require('../database')

module.exports = {
    getSemuaNilai: async (req, res, next) => {
        const id_user = req.user.username
        try {
            const [getData] = await db.query('select nilai, to_ke from nilai_user where id_user = ?', [id_user])
            res.status(200).json({
                "success": true,
                "data": getData
            })
        } catch (e) {
            next(e)
        }
    },

    getRincianNilai: async (req, res, next) => {
        const id_user = req.user.username
        const tipe = req.user.tipe_soal
        const toKe = req.params.id
        try {
            const queryNilai = 'select sum(bobot) nilai from rekap_to where id_user = ? and to_ke = ? and id_materi_soal = ?'

            const [getTps] = await db.query(queryNilai, [id_user, toKe, 1])
            if (tipe == 1) {
                var [get1] = await db.query(queryNilai, [id_user, toKe, 6])
                var [get2] = await db.query(queryNilai, [id_user, toKe, 7])
                var [get3] = await db.query(queryNilai, [id_user, toKe, 8])
                var [get4] = await db.query(queryNilai, [id_user, toKe, 5])
            } else {
                var [get1] = await db.query(queryNilai, [id_user, toKe, 9])
                var [get2] = await db.query(queryNilai, [id_user, toKe, 10])
                var [get3] = await db.query(queryNilai, [id_user, toKe, 11])
                var [get4] = await db.query(queryNilai, [id_user, toKe, 12])
            }
            res.status(200).json({
                "success": true,
                "tps": getTps[0].nilai,
                "materi 1": get1[0].nilai,
                "materi 2": get2[0].nilai,
                "materi 3": get3[0].nilai,
                "materi 4": get4[0].nilai,

            })
        } catch (err) {
            next(err)
        }
    },
}