const router = require('express').Router()

const admRout = require('./admin-router')

const authRout = require('./auth-router')
const akunRout = require('./akun-router')
const bayarRout = require('./pembayaran-router')
const tryoutRout = require('./tryout-router')
const bahasRout = require('./pembahasan-router')
const rasioRout = require('./rasionalisasi-router')
const capaiRout = require('./pencapaian-router')

router.use('/admin', admRout)

router.use('/auth', authRout) // Bismillah beres
router.use('/akun', akunRout) // Bismillah beres
router.use('/pembayaran', bayarRout) // Bismillah beres
router.use('/tryout', tryoutRout) // Bismillah beres
router.use('/pembahasan', bahasRout)
router.use('/rasionalisasi', rasioRout) // Bismillah beres
router.use('/pencapaian', capaiRout)

router.use(notFound)
router.use(errorHandler)

function notFound(req, res, next) {
    res.status(404)
    const err = new Error("Page not found")
    next(err)
}

function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500)
    const message = err.message || "Internal server error"
    res.json({
        "message": message
    })
}

module.exports = router