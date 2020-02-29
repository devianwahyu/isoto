const db = require('../database')

module.exports = {
    tryout: async (req, res, next) => {
        const idSoal = req.params.id
        const type = req.user.tipe_soal
        const status_bayar = req.user.status_bayar
        try {
            if (status_bayar) {
                const [soal] = await db.query('select id, id_tipe_soal tipe, konten, opsi_a, opsi_b, opsi_c, opsi_d from soal where id = ?', [idSoal])
                if (soal[0].tipe == type || soal[0].tipe == 3) {
                    res.status(200).json({
                        "status": true,
                        "data": soal
                    })
                } else {
                    const err = new Error('Tipe soal kamu tidak sesuai')
                    res.status(403)
                    next(err)
                }
            } else {
                const err = new Error('Pembayaran diperlukan untuk akses')
                res.status(402)
                next(err)
            }
        } catch (e) {
            next(e)
        }
    },

    rekapHasil: async (req, res, next) => {
        const id_user = req.user.username
        const tipe_soal = req.user.tipe_soal
        const idSoal = req.params.id
        const jawaban = req.body.jawaban
        try {
            const queryInsert = 'insert into rekap_to(id_user, id_soal, id_materi_soal, bobot, to_ke) values(?, ?, ?, ?, ?)'
            const queryUpdate = 'update rekap_to set bobot = ? where id_user = ? and id_soal = ?'

            const [getToke] = await db.query('select to_ke from akun where username = ?', [id_user])
            const [getJawaban] = await db.query('select jawaban, bobot, id_materi_soal materi, id_tipe_soal tipe from soal where id = ?', [idSoal])
            const [cekTabelRekap] = await db.query('select * from rekap_to where id_user = ? and id_soal = ?', [id_user, idSoal])
            if (getJawaban[0].tipe == tipe_soal || getJawaban[0].tipe == 3) {
                if (!cekTabelRekap.length) {
                    if (jawaban == getJawaban[0].jawaban) {
                        db.query(queryInsert, [id_user, idSoal, getJawaban[0].materi, getJawaban[0].bobot, getToke[0].to_ke])
                    } else {
                        db.query(queryInsert, [id_user, idSoal, getJawaban[0].materi, 0, getToke[0].to_ke])
                    }
                } else {
                    if (jawaban == getJawaban[0].jawaban) {
                        db.query(queryUpdate, [getJawaban[0].bobot, id_user, idSoal])
                    } else {
                        db.query(queryUpdate, [0, id_user, idSoal])
                    }
                }
                res.status(200).json({
                    "success": true,
                    "message": "Rekap nilai berhasil"
                })
            } else {
                const err = new Error('Tipe soal kamu tidak sesuai')
                res.status(403)
                next(err)
            }
        } catch (e) {
            next(e)
        }
    },

    hitungHasil: async (req, res, next) => {
        const id_user = req.user.username
        try {
            const [to_ke] = await db.query('select to_ke from akun where username = ?', [id_user])
            const [cekTabelNilai] = await db.query('select * from nilai_user where id_user = ? and to_ke = ? limit 1', [id_user, to_ke[0].to_ke])

            if (!cekTabelNilai.length) {
                const [getSum] = await db.query('select sum(bobot) nilai from rekap_to where id_user = ? and to_ke = ?', [id_user, to_ke[0].to_ke])
                let nilai = getSum[0].nilai / 5.0

                db.query('update akun set status_bayar = 0 where username = ?', [id_user])
                db.query('insert into nilai_user(id_user, nilai, to_ke) values(?, ?, ?)', [id_user, nilai, to_ke[0].to_ke])
                res.json({
                    "success": true,
                    "nilai": "Nilai berhasil dihitung"
                })
            } else {
                const err = new Error('Sudah ada nilai')
                res.status(409)
                next(err)
            }

        } catch (e) {
            next(e)
        }
    }
}