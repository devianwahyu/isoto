const router = require('express').Router()
const adminController = require('../controllers/admin-controller')
const { checkToken } = require('../middleware')


// Tambah soal
router.post('/question/add', checkToken, adminController.addQuestion)

// Edit soal
router.put('/question/update', checkToken, adminController.updateQuestion)

// Hapus soal
router.delete('/question/delete/:id', checkToken, adminController.deleteQuestion)

// Tampilkan soal berdasarkan id
router.get('/question/show/:id', checkToken, adminController.getQuestionByType)

// Tampilkan semua soal
router.get('/question/show', checkToken, adminController.getAllQuestion)

// Tampilkan semua member
router.get('/user/show', checkToken, adminController.getAllMember)

// Update status bayar member
router.put('/user/payment', checkToken, adminController.updatePaymentStatusMember)

module.exports = router