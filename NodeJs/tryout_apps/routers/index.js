const router = require('express').Router()
const userRouter = require('./UserRouter')
const adminRouter = require('./AdminRouter')

router.use('/user', userRouter)
router.use('/admin', adminRouter)

router.use(notFound)
router.use(errorHandler)

function notFound(req, res, next) {
    res.status(404)
    const err = new Error('Page not found')
    next(err)
}

function errorHandler(req, res) {
    res.status(res.statusCode || 500)
    const err = new Error('Internal Server Error')
    res.json({
        "message": err
    })
}

module.exports = router