/**
 * @author Earl Cameron
 * @description Employee time management
 */
const router = require('express').Router()
const {
    assign,
    test
} = require('../handler/Employee')
module.exports = router
    .post('/assign', assign)
    .post('/test', test)