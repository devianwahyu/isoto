const router = require('express').Router()
const { checkToken } = require('../middleware')
const bahasCtrl = require('../controllers/pembahasan-controller')

// Video pembahasan
router.get('/video', checkToken, bahasCtrl.videoBahas)

// Kunci jawaban
router.get('/teks', checkToken, bahasCtrl.teksBahas)

module.exports = router