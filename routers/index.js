const router = require('express').Router()
const authRouter = require('./auth-router')
const accountRouter = require('./account-router')
const paymentRouter = require('./payment-router')
const adminRouter = require('./admin-router')
const questionRouter = require('./question-router')
const discussionRouter = require('./discussion-router')

router.use('/auth', authRouter)
router.use('/account', accountRouter)
router.use('/payment', paymentRouter)
router.use('/admin', adminRouter)
router.use('/question', questionRouter)
router.use('/discussion', discussionRouter)


module.exports = router