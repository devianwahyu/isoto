const router = require('express').Router()
const adminController = require('../controllers/AdminController')

// Tampilkan semua member
router.get('/member', adminController.getAllMembers)

// Tampilkan member berdasar tipe
router.get('/member/:id', adminController.getMemberBy)

// Hapus member berdasar lama tidak aktif

// Tambahkan soal

// Edit soal

// Hapus soal

// Tambahkan universitas
router.post('/universitas', adminController.addUniversity)

// Edit universitas
router.put('/universitas', adminController.updateUniversity)

// Delete universitas
router.delete('/universitas/:id', adminController.deleteUniversity)

// Tampilkan semua universitas
router.get('/universitas', adminController.getAllUniversities)

// Tambahkan department
router.post('/department', adminController.addDepartment)

module.exports = router