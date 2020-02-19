const router = require('express').Router()
const paymentController = require('../controllers/payment-controller')
const { checkToken } = require('../middleware')

// Bayar tryout
router.put('/tryout', checkToken, paymentController.tryoutPayment)

// Bayar upgrade member
router.put('/upgrade', checkToken, paymentController.upgradePayment)

module.exports = router