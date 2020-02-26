const router = require('express').Router()
const paymentCtrl = require('../controllers/payment-controller')
const { checkToken } = require('../middleware')

// Bayar tryout
router.put('/tryout', checkToken, paymentCtrl.tryoutPayment)

// Bayar upgrade member
router.put('/upgrade', checkToken, paymentCtrl.upgradePayment)

module.exports = router