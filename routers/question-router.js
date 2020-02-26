const router = require('express').Router()
const { checkToken } = require('../middleware')
const questCtrl = require('../controllers/question-controller')

// Tampilkan soal berdasar pilihan tipe soal
router.get('/', checkToken, questCtrl.tryout)

// Pembobotan
router.post('/pembobotan/:id', checkToken, questCtrl.pembobotan)

// Selesai
// router.use

module.exports = router