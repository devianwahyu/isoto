const router = require('express').Router()
const authRouter = require('./auth-router')
const accountRouter = require('./account-router')
const paymentRouter = require('./payment-router')
const adminRouter = require('./admin-router')

router.use('/auth', authRouter) // BERES
router.use('/account', accountRouter) // BERES
router.use('/payment', paymentRouter) // BERES
router.use('/admin', adminRouter) //


module.exports = router