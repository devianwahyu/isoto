const db = require('../database')

module.exports = {
    cekPilihanUtama: async (req, res, next) => {
        const nilai = 500
        const username = req.user.username
        try {
            const [batas] = await db.query('select batas_nilai from akun a inner join batas_nilai bn on a.ID_UNIVERSITAS = bn.ID_UNIVERSITAS and a.ID_PRODI = bn.ID_PRODI where a.USERNAME = ?', [username])
            if (nilai >= batas[0].batas_nilai) {
                res.status(200).json({
                    "message": "Berdasarkan simulasi BrawijayaTO, nilai kamu diprediksikan SUDAH memenuhi batas nilai prediksi lulus prodi yang kamu pilih."
                })
            } else {
                res.status(200).json({
                    "message": "Berdasarkan simulasi BrawijayaTO, nilai kamu diprediksikan BELUM memenuhi batas nilai prediksi lulus prodi yang kamu pilih."
                })
            }
        } catch (e) {
            next(e)
        }
    },

    cekAlternatifUniv: async (req, res, next) => {
        const nilai = 500
        const username = req.user.username
        try {
            const [data] = await db.query('select prodi, universitas, batas_nilai from akun a inner join batas_nilai bn on a.ID_UNIVERSITAS = bn.ID_UNIVERSITAS inner join prodi p on bn.ID_PRODI = p.ID inner join universitas u on bn.ID_UNIVERSITAS = u.ID where a.USERNAME = ? and bn.BATAS_NILAI < ? limit 5', [username, nilai])
            res.json({
                "success": true,
                "data": data
            })
        } catch (e) {
            next(e)
        }
    },

    cekAlternatifProdi: async (req, res, next) => {
        const nilai = 500
        const username = req.user.username
        try {
            const [data] = await db.query('select prodi, universitas, batas_nilai from akun a inner join batas_nilai bn on a.ID_PRODI = bn.ID_PRODI inner join prodi p on bn.ID_PRODI = p.ID inner join universitas u on bn.ID_UNIVERSITAS = u.ID where a.USERNAME = ? and bn.BATAS_NILAI < ? limit 5', [username, nilai])
            res.json({
                "success": true,
                "data": data
            })
        } catch (e) {
            next(e)
        }
    },
}