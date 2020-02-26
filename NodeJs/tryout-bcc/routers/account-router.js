const router = require('express').Router()
const accountCtrl = require('../controllers/account-controller')
const { checkToken } = require('../middleware')

// Jurusan dan Universitas pilihan
router.put('/pilih', checkToken, accountCtrl.pilihUnivDepart)

// Hapus akun
router.delete('/profil', checkToken, accountCtrl.deleteAccount)

// Tampilkan profile
router.get('/profil', checkToken, accountCtrl.getProfile)

module.exports = router