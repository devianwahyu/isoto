const router = require('express').Router()
const userController = require('../controllers/UserController')

// User Register
router.post('/register', userController.registerUser)

// User Login
router.post('/login', userController.loginUser)

// User Edit
router.put('/:id', userController.editName)

// Delete User
router.delete('/:id', userController.deleteUser)

module.exports = router