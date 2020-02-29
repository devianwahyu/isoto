const db = require('../database')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

module.exports = {
    daftar: async (req, res, next) => {
        const id_user = req.body.username
        const email = req.body.email
        const password = req.body.password
        const konfirmasiPassword = req.body.konfirmasiPassword
        try {
            const [check] = await db.query('select * from akun where username = ? or email = ? limit 1', [id_user, email])
            if (check.length) {
                const err = new Error('Email atau Username sudah terdaftar')
                res.status(409)
                next(err)
            } else {
                const isEmail = await validator.isEmail(email)
                if (!isEmail) {
                    const err = new Error('Format email salah')
                    res.status(422)
                    next(err)
                } else {
                    if (konfirmasiPassword === password) {
                        const hashpass = await bcrypt.hash(password, 10)
                        db.query('insert into akun(username, email, password) values(?, ?, ?)', [id_user, email, hashpass])
                        res.status(200).json({
                            "success": true,
                            "message": "Berhasil mendaftar"
                        })
                    } else {
                        const err = new Error('Password konfirmasi tidak sama dengan password')
                        res.status(401)
                        next(err)
                    }
                }
            }
        } catch (e) {
            next(e)
        }
    },

    login: async (req, res, next) => {
        const email = req.body.email
        const password = req.body.password
        try {
            const [check] = await db.query('select * from akun where email = ?', [email])
            if (!check.length) {
                const err = new Error('Pengguna tidak ditemukan')
                res.status(404)
                next(err)
            } else {
                const verifikasiPass = await bcrypt.compare(password, check[0].PASSWORD)
                if (!verifikasiPass) {
                    const err = new Error('Password salah')
                    res.status(401)
                    next(err)
                } else {
                    const payload = {
                        "username": check[0].USERNAME,
                        "tipe_member": check[0].ID_TIPE_MEMBER,
                        "tipe_soal": check[0].ID_TIPE_SOAL,
                        "status_bayar": check[0].STATUS_BAYAR
                    }
                    const token = await jwt.sign(payload, JWT_KEY)
                    if (token) {
                        res.status(200).json({
                            "success": true,
                            "token": token,
                        })
                    } else {
                        const err = new Error('JWT gagal mengenerate token')
                        res.status(500)
                        next(err)
                    }
                }
            }
        } catch (e) {
            next(e)
        }
    }
}