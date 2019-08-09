/**
 * @author  earl Cameron
 * @description Authentication manager
 */
const {
    sign
} = require('../util/Token')
const response = require('../util/Response')
const test = async (req, res) => {
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
            cookie: cookie,
            status: 200,
            res: res
        })
    } catch (error) {
        response({
            message: `you didn't get a cookie :)`,
            status: 500,
            error: error,
            res: res
        })
    }
}
module.exports = {
    test: test
}