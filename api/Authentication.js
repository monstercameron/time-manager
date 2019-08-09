const router = require('express').Router()
module.exports = router
    .get('/test', (req, res) => {
        response({
            message: 'Hello World!',
            status: 200,
            res: res
        })
    })
    .get('/test/login', require('../handler/Authentication').test)
    .post('/login', (req, res) => {})
    .post('/register', (req, res) => {})
    .post('/reset', (req, res) => {})
    .post('/clockin', require('../middleware/Token').isAuth, (req, res) => {})