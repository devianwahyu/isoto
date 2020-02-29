const router = require('express').Router()
const capaiCtrl = require('../controllers/pencapaian-contoller')
const { checkToken } = require('../middleware')

// Nampilin hasil total semua Tryout
router.get('/semua', checkToken, capaiCtrl.getSemuaNilai)

// Nampilin spesifikasi nilai semua tryout
router.get('/rinci/:id', checkToken, capaiCtrl.getRincianNilai)

module.exports = router