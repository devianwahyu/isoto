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

// Tambah universitas
router.post('/university/add', checkToken, adminController.addUniversity)

// Update universitas
router.put('/university/update', checkToken, adminController.updateUniversity)

// Hapus universitas
router.delete('/university/delete/:id', checkToken, adminController.deleteUniversity)

// Tampilkan semua universitas
router.get('/university/show', checkToken, adminController.showUniversity)

// Tambah jurusan
router.post('/department/add', checkToken, adminController.addDepartent)

// Update jurusan
router.put('/department/update', checkToken, adminController.updateDepartent)

// Hapus jurusan
router.delete('/department/delete/:id', checkToken, adminController.deleteDepartent)

// Tampilkan semua jurusan
router.get('/department/show', checkToken, adminController.showDepartent)

module.exports = router