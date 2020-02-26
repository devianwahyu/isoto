const db = require('../database')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

module.exports = {
    register: async (req, res, next) => {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword
        try {
            const [check] = await db.query('SELECT * FROM AKUN WHERE USERNAME = ? OR EMAIL = ? LIMIT 1', [username, email])
            if (check.length) res.status(409).send('Email or Username already registered')
            else {
                const isEmail = await validator.isEmail(email)
                if (!isEmail) res.status(422).send('Wrong format email')
                else {
                    if (confirmPassword === password) {
                        const hashpass = await bcrypt.hash(password, 10)
                        db.query('INSERT INTO AKUN(USERNAME, EMAIL, PASSWORD) VALUES(?, ?, ?)', [username, email, hashpass])
                        res.status(200).json({
                            "success": true,
                            "message": "Registered successfuly"
                        })
                    } else res.status(401).send('Confirm password not same with password')
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
            const [check] = await db.query('SELECT * FROM AKUN WHERE EMAIL = ?', [email])
            if (!check.length) res.status(404).send('User not found')
            else {
                const passwordVerify = await bcrypt.compare(password, check[0].PASSWORD)
                if (!passwordVerify) res.status(401).send('Wrong password')
                else {
                    const payload = {
                        "username": check[0].USERNAME,
                        "email": check[0].EMAIL,
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
                        res.status(500).send("JWT can't generate token")
                    }
                }
            }
        } catch (e) {
            next(e)
        }
    }
}