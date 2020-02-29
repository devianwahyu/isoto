const router = require('express').Router()
const { checkToken } = require('../middleware')
const rasioCtrl = require('../controllers/rasionalisasi-controller')

// Rasionalisasi
router.get('/utama/:id', checkToken, rasioCtrl.cekPilihanUtama)

// Alternatif pilihan berdasar kesamaan universitas
router.get('/alternatif/universitas/:id', checkToken, rasioCtrl.cekAlternatifUniv)

// Alternatif pilihan berdasar kesamaan prodi
router.get('/alternatif/prodi/:id', checkToken, rasioCtrl.cekAlternatifProdi)

// Alternatif pilihan berdasar bidang keilmuan
router.get('/alternatif/bidang/:id', checkToken, rasioCtrl.cekAlternatifKeilmuan)

module.exports = router