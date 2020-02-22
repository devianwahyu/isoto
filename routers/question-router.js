const router = require('express').Router()
const { checkToken } = require('../middleware')
const questionController = require('../controllers/question-controller')

// Tampilkan soal berdasar pilihan tipe soal
router.get('/:id', checkToken, questionController.tryout)

module.exports = router