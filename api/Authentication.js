/**
 * @author Earl Cameron
 * @description Authentication API
 */
const router = require('express').Router()
const {test,registerSwitch, login, reset, clockIn} = require('../handler/Authentication')
const {isAuth} = require('../middleware/Token')
module.exports = router
    .get('/test/login', test)
    .post('/register', registerSwitch)
    .post('/login', login)
    .post('/reset', reset)
    .post('/clockin', isAuth, clockIn)