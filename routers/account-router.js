const router = require('express').Router()
const accountController = require('../controllers/account-controller')
const { checkToken } = require('../middleware')

// Edit nama
router.put('/name', checkToken, accountController.updateName)

// Jurusan dan Universitas pilihan
router.put('/selection', checkToken, accountController.insertSelection)

// Hapus akun
router.delete('/delete', checkToken, accountController.deleteAccount)

// Tampilkan profile
router.get('/profile', checkToken, accountController.getProfile)

module.exports = router