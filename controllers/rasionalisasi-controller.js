const db = require('../database')

module.exports = {
    cekPilihanUtama: async (req, res, next) => {
        const id_user = req.user.username
        const toKe = req.params.id
        try {
            const queryGetData = `
            select universitas, prodi, nilai, batas_nilai prediksi
            from akun a 
            inner join nilai_user nu
            on a.username = nu.id_user
            inner join batas_nilai bn 
            on a.id_universitas = bn.id_universitas and a.id_prodi = bn.id_prodi 
            inner join universitas u
            on a.id_universitas = u.id
            inner join prodi p
            on a.id_prodi = p.id
            where username = ? and nu.to_ke = ?`

            const [getData] = await db.query(queryGetData, [id_user, toKe])
            let message

            if (getData[0].nilai >= getData[0].prediksi) {
                message = "Berdasarkan simulasi BrawijayaTO, nilai kamu diprediksikan SUDAH memenuhi batas nilai prediksi lulus prodi yang kamu pilih."
            } else {
                message = "Berdasarkan simulasi BrawijayaTO, nilai kamu diprediksikan BELUM memenuhi batas nilai prediksi lulus prodi yang kamu pilih."
            }
            res.status(200).json({
                "success": true,
                "data": getData,
                "message": message
            })
        } catch (e) {
            next(e)
        }
    },

    cekAlternatifUniv: async (req, res, next) => {
        const id_user = req.user.username
        const toKe = req.params.id
        try {
            const queryGetNilai = 'select nilai from nilai_user where id_user = ? and to_ke = ?'
            const queryGetTipe = `
            select id_tipe_prodi tipe
            from akun a 
            inner join prodi p 
            on a.id_prodi = p.id 
            where username = ? 
            limit 1`
            const queryGetData = `
            select prodi, universitas, batas_nilai 
            from akun a 
            inner join batas_nilai bn 
            on a.id_universitas = bn.id_universitas 
            inner join prodi p 
            on bn.id_prodi = p.id 
            inner join universitas u 
            on bn.id_universitas = u.id 
            where username = ? and id_tipe_prodi = ? and batas_nilai < ?
            limit 5`

            const [getNilai] = await db.query(queryGetNilai, [id_user, toKe])
            const [getTipe] = await db.query(queryGetTipe, [id_user])
            const [getData] = await db.query(queryGetData, [id_user, getTipe[0].tipe, getNilai[0].nilai])

            res.json({
                "success": true,
                "data": getData
            })
        } catch (e) {
            next(e)
        }
    },

    cekAlternatifProdi: async (req, res, next) => {
        const id_user = req.user.username
        const toKe = req.params.id
        try {
            const queryGetNilai = 'select nilai from nilai_user where id_user = ? and to_ke = ?'
            const queryGetData = `
            select prodi, universitas, batas_nilai 
            from akun a 
            inner join batas_nilai bn 
            on a.id_prodi = bn.id_prodi 
            inner join prodi p 
            on bn.id_prodi = p.id 
            inner join universitas u 
            on bn.id_universitas = u.id 
            where username = ? and batas_nilai < ? 
            limit 5`

            const [getNilai] = await db.query(queryGetNilai, [id_user, toKe])
            const [getData] = await db.query(queryGetData, [id_user, getNilai[0].nilai])

            res.json({
                "success": true,
                "data": getData
            })
        } catch (e) {
            next(e)
        }
    },

    cekAlternatifKeilmuan: async (req, res, next) => {
        const id_user = req.user.username
        const toKe = req.params.id
        try {
            const queryGetNilai = 'select nilai from nilai_user where id_user = ? and to_ke = ?'
            const queryGetId = `
            select id_bidang_keilmuan id_bidang, a.id_prodi 
            from akun a 
            inner join batas_nilai bn 
            on a.id_prodi = bn.id_prodi 
            where username = ? limit 1`
            const queryGetData = `
            select prodi, universitas, batas_nilai 
            from batas_nilai bn 
            inner join prodi p 
            on bn.id_prodi = p.id 
            inner join universitas u 
            on bn.id_universitas = u.id 
            inner join bidang_keilmuan bk 
            on bn.id_bidang_keilmuan = bk.id 
            where bn.id_bidang_keilmuan = ? and id_prodi != ? and batas_nilai < ?
            limit 5`

            const [getNilai] = await db.query(queryGetNilai, [id_user, toKe])
            const [getId] = await db.query(queryGetId, [id_user])
            const [getData] = await db.query(queryGetData, [getId[0].id_bidang, getId[0].id_prodi, getNilai[0].nilai])

            res.status(200).json({
                "success": true,
                "data": getData
            })
        } catch (e) {
            next(e)
        }
    }
}