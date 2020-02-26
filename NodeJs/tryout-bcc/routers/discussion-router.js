const router = require('express').Router()
const { checkToken } = require('../middleware')
const discussCtrl = require('../controllers/discussion-controller')

// Video pembahasan
router.get('/video', checkToken, discussCtrl.videoDiscussion)

// Kunci jawaban
router.get('/teks', checkToken, discussCtrl.textDiscussion)

module.exports = router