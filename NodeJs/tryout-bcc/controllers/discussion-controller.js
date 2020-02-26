const fs = require('fs')
const db = require('../database')

module.exports = {
    videoDiscussion: async (req, res, next) => {
        const tipe_member = req.user.tipe_member
        try {
            if (tipe_member == 3) {
                const [row] = await db.query('SELECT NAMA FROM TIPE_SOAL WHERE ID = ?', [req.user.tipe_soal])
                const path = `assets/${row[0].NAMA}.mp4`
                const stat = fs.statSync(path)
                const fileSize = stat.size
                const range = req.headers.range
                if (range) {
                    const parts = range.replace(/bytes=/, "").split("-")
                    const start = parseInt(parts[0], 10)
                    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
                    const chunksize = (end - start) + 1
                    const file = fs.createReadStream(path, { start, end })
                    const head = {
                        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunksize,
                        'Content-Type': 'video/mp4',
                    }
                    res.writeHead(206, head);
                    file.pipe(res);
                } else {
                    const head = {
                        'Content-Length': fileSize,
                        'Content-Type': 'video/mp4',
                    }
                    res.writeHead(200, head)
                    fs.createReadStream(path).pipe(res)
                }
            } else {
                res.status(403).send("You're not premium member")
            }
        } catch (e) {
            next(e)
        }
    },

    textDiscussion: async (req, res, next) => {
        try {
            const [rows] = await db.query('SELECT NAMA TIPE, KONTEN, JAWABAN FROM SOAL S INNER JOIN TIPE_SOAL TS ON S.ID_TIPE_SOAL = TS.ID WHERE S.ID_TIPE_SOAL = ?', [req.user.tipe_soal])
            res.status(200).json({
                "success": true,
                "data": rows
            })
        } catch (e) {
            next(e)
        }
    }
}