const router = require('express').Router()
const authCtrl = require('../controllers/auth-controller')
const { checkToken } = require('../middleware')

// Register
router.post('/daftar', authCtrl.register)

// Login
router.post('/login', authCtrl.login)

module.exports = router