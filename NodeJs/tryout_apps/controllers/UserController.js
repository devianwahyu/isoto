const emailValidator = require('validator')
const db = require('../database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const getData = require('../send_email')
const JWT_TOKEN = process.env.JWT_TOKEN

module.exports = {
    registerUser: async (req, res, next) => {
        const username = req.body.username
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const id_member = req.body.id_member
        try {
            const [check] = await db.query('SELECT * FROM `users` WHERE `username` = ? OR `email` = ? LIMIT 1', [username, email])
            if (!check.length) {
                const verify = emailValidator.isEmail(email)
                if (verify) {
                    const hashedPassword = await bcrypt.hash(password, 11)
                    db.query('INSERT INTO `users`(username, name, email, password, id_type_member) VALUES(?, ?, ?, ?, ?)', [username, name, email, hashedPassword, id_member])
                    res.json({
                        "success": true
                    })
                }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                res.json({
                    "success": verify
                })
            } else {
                let message = ''
                if (username === check[0].username && email === check[0].email) message = 'Username and Email already registered'
                else if (email === check[0].email) message = 'Email already registered'
                else message = 'Username already taken'
                res.status(409).json({
                    "success": false,
                    "message": message
                })
            }
        } catch (err) {
            next(err)
        }
    },

    loginUser: async (req, res, next) => {
        const username = req.body.username
        const password = req.body.password
        try {
            const [check] = await db.query('SELECT * FROM `users` WHERE `username` = ? LIMIT 1', [username])
            if (!check.length) {
                res.status(404).json({
                    "success": false,
                    "message": "Username not found"
                })
            } else {
                const user = check[0]
                const comparePassword = await bcrypt.compare(password, user.password)
                if (comparePassword) {
                    const payload = {
                        "username": user.username
                    }
                    const token = await jwt.sign(payload, JWT_TOKEN)
                    if (token) {
                        res.status(200).json({
                            "success": true,
                            "token": token
                        })
                    } else {
                        const error = new Error("JWT Error, can't create token")
                        next(error)
                    }
                } else {
                    res.status(406).json({
                        "success": false,
                        "message": "Password wrong"
                    })
                }
            }
        } catch (err) {
            next(err)
        }
    },

    // upgradeMember: async (req, res, next) => {

    // }

    editName: (req, res, next) => {
        const id = req.params.id
        const newName = req.body.newName
        try {
            db.query('UPDATE `users` SET `name` = ? WHERE `username` = ?', [newName, id])
            res.status(200).json({
                "success": true,
                "message": "Nama berhasil diperbaharui"
            })
        } catch (err) {
            next(err)
        }
    },

    deleteUser: (req, res, next) => {
        const id = req.params.id
        try {
            db.query('DELETE FROM `users` WHERE `username` = ?', [id])
            res.status(200).json({
                "success": true,
                "message": "User berhasil dihapus"
            })
        } catch (err) {
            next(err)
        }
    }
}
