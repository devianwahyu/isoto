const router = require('express').Router()
const { checkToken } = require('../middleware')
const discussionController = require('../controllers/discussion-controller')

// Video pembahasan
router.get('/video', checkToken, discussionController.videoDiscussion)

// Kunci jawaban
router.get('/answer', checkToken, discussionController.textDiscussion)

module.exports = router