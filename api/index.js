const router = require('express').Router()
const {
    isAuth: isAuthenticate
} = require('../middleware/Token')
router.use('/auth', require('./Authentication'))
module.exports = router