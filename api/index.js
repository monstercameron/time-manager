/**
 * @author Earl Cameron
 * @description APi sub-routes
 */
const router = require('express').Router()
const {
    isAuth
} = require('../middleware/Token')
router.use('/auth', require('./Authentication'))
router.use('/date', isAuth, require('./Date'))
router.use('/employee', isAuth, require('./Employee'))
module.exports = router