const router = require('express').Router()
const { checkToken } = require('../middleware')
const tryoutCtrl = require('../controllers/tryout-controller')

// Tampilkan soal berdasar pilihan tipe soal
router.get('/soal/:id', checkToken, tryoutCtrl.tryout)

// Rekap hasil tryout
router.post('/rekap/:id', checkToken, tryoutCtrl.rekapHasil)

// Menghitung hasil rekap
router.post('/hitung', checkToken, tryoutCtrl.hitungHasil)

module.exports = router