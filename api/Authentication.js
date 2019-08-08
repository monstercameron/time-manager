const router = require('express').Router()
const {
    isAuth
} = require('../middleware/Token')
const response = require('../util/Response')
const {
    sign
} = require('../util/Token')
module.exports = router
    .get('/test', (req, res) => {
        response({
            message: 'Hello World!',
            status: 200,
            res: res
        })
    })
    .get('/test/login', async (req, res) => {
        try {

            const token = await sign({
                payload: {
                    test: 'this was a test'
                }
            })
            const cookie = {
                name: 'token',
                value: token,
                age: 1000 * 60 * 60 //1 hour
            }
            response({
                message: `you got a cookie :) ${token}`,
                cookie:cookie,
                status: 200,
                res: res
            })
        } catch (error) {
            response({
                message: `you didn't get a cookie :)`,
                status: 500,
                error:error,
                res: res
            })
        }
    })
    .post('/login', (req, res) => {})
    .post('/register', (req, res) => {})
    .post('/reset', (req, res) => {})
    .post('/clockin', isAuth, (req, res) => {})