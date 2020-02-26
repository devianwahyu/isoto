const router = require('express').Router()
const { checkToken } = require('../middleware')
const rasioCtrl = require('../controllers/rasionalisasi-controller')

// Rasionalisasi
router.get('/utama', checkToken, rasioCtrl.cekPilihanUtama)

// Alternatif pilihan berdasar kesamaan universitas
router.get('/alternatif/universitas', checkToken, rasioCtrl.cekAlternatifUniv)

// Alternatif pilihan berdasar kesamaan prodi
router.get('/alternatif/prodi', checkToken, rasioCtrl.cekAlternatifProdi)

module.exports = router