const db = require('../database')

module.exports = {
    // Mengambil semua data member dari table users
    getAllMembers: async (req, res, next) => {
        try {
            const [rows] = await db.query('SELECT * FROM `users`')
            res.status(200).json({
                "success": true,
                "data": rows
            })
        } catch (err) {
            next(err)
        }
    },

    // Mengambil semua data member berdasar username dan tipe member
    getMemberBy: async (req, res, next) => {
        const id = req.params.id
        try {
            const [rows] = await db.query('SELECT * FROM `users` WHERE `id_type_member` = ? OR `username` = ?', [id, id])
            res.status(200).json({
                "success": true,
                "data": rows[0]
            })
        } catch (err) {
            next(err)
        }
    },


    // Menambahkan data universitas ke table universities
    addUniversity: async (req, res, next) => {
        const universityName = req.body.universityName
        try {
            const [check] = await db.query('SELECT * FROM `universities` WHERE `name` = ? LIMIT 1', [universityName])
            if (!check.length) {
                db.query('INSERT INTO `universities`(name) VALUES(?)', [universityName])
                res.status(200).json({
                    "success": true,
                    "message": "Universitas berhasil ditambahkan"
                })
            } else {
                const err = new Error('Universitas sudah pernah ditambahkan')
                err.statusCode = 409
                next(err)
            }
        } catch (err) {
            next(err)
        }
    },

    // Mengupdate data universitas berdasar id
    updateUniversity: async (req, res, next) => {
        const id = req.body.id
        const universityName = req.body.universityName
        try {
            const [check] = await db.query('SELECT * FROM `universities` WHERE `id` = ? LIMIT 1', [id])
            if (check.length) {
                db.query('UPDATE `universities` SET `name` = ? WHERE `id` = ?', [universityName, id])
                res.status(200).json({
                    "success": true,
                    "message": "Nama universitas berhasil di update"
                })
            } else {
                const err = new Error('Universitas tidak ditemukan')
                err.statusCode = 409
                next(err)
            }
        } catch (err) {
            next(err)
        }
    },

    // Menghapus data universitas berdasar id
    deleteUniversity: async (req, res, next) => {
        const id = req.params.id
        try {
            const [check] = await db.query('SELECT * FROM `universities` WHERE `id` = ? LIMIT 1', [id])
            if (check.length) {
                db.query('DELETE FROM `universities` WHERE `id` = ?', [id])
                res.status(200).json({
                    "success": true,
                    "message": "Universitas berhasi dihapus"
                })
            } else {
                const err = new Error('Universitas dengan id tersebut tidak ditemukan')
                err.statusCode = 404
                next(err)
            }
        } catch (err) {
            next(err)
        }
    },

    // Menampilkan semua data univesitas
    getAllUniversities: async (req, res, next) => {
        try {
            const [rows] = await db.query('SELECT * FROM `universities`')
            res.status(200).json({
                "success": true,
                "data": rows
            })
        } catch (err) {
            next(err)
        }
    },

    // Menambahkan department pada table departments
    addDepartment: async (req, res, next) => {
        const id_university = req.body.id_university
        const name = req.body.name
        const min_score = req.body.min_score
        try {
            const [check] = await db.query('SELECT * FROM `departments` WHERE `id_university` = ?', [id_university])
            if (!check.length) {
                db.query('INSERT INTO `departments`(id_university , name, min_score) VALUES(?, ?, ?)', [id_university, name, min_score])
                res.status(200).json({
                    "success": true,
                    "message": "Department berhasil ditambahkan"
                })
            } else {
                const err = new Error('Department tersebut sudah ada')
                err.statusCode = 409
                next(err)
            }
        } catch (err) {
            next(err)
        }
    }
}