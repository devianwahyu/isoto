const router = require('express').Router()
const akunCtrl = require('../controllers/akun-controller')
const { checkToken } = require('../middleware')

// Tampilkan profile
router.get('/profil', checkToken, akunCtrl.getProfil)

// Jurusan dan Universitas pilihan
router.put('/pilih', checkToken, akunCtrl.pilihUnivDepart)

// Hapus akun
router.delete('/profil', checkToken, akunCtrl.hapusAkun)

module.exports = router