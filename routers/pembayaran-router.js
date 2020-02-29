const router = require('express').Router()
const bayarCtrl = require('../controllers/pembayaran-controller')
const { checkToken } = require('../middleware')

// Bayar tryout
router.put('/tryout', checkToken, bayarCtrl.bayarTryout)

// Bayar upgrade member
router.put('/upgrade', checkToken, bayarCtrl.bayarUpgrade)

module.exports = router