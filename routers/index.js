const router = require('express').Router()
const authRout = require('./auth-router')
const accountRout = require('./account-router')
const payRout = require('./payment-router')
const admRout = require('./admin-router')
const questRout = require('./question-router')
const discussRout = require('./discussion-router')
const rasioRout = require('./rasionalisasi-router')

router.use('/admin', admRout)

router.use('/auth', authRout)
router.use('/akun', accountRout)
router.use('/pembayaran', payRout)
router.use('/soal', questRout)
router.use('/pembahasan', discussRout)
router.use('/rasionalisasi', rasioRout)

module.exports = router