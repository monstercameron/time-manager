/**
 * @author Earl Cameron
 * @description JWT Signing and verifying
 */
const jwt = require('jsonwebtoken')
/**
 * @name Sign 
 * @description     crypto sign JSON payload
 * @param {object}  payload data object
 * @param {object}  options data object for setting bcrypt options
 * @param {function callback(err, token)} callback has access to err object and results
 * @return {string} hash
 */
const sign = ({
    payload,
    options,
    callback
}) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                options,
                !callback ? (err, token) => resolve(token) : callback)
        } catch (err) {
            reject(new Error(err))
        }
    })
}
/**
 * @name Verify 
 * @description     Decrypt JWT with integirty
 * @param {strin}   token encrypted token to decrypt with integrity
 * @param {object}  options data object for setting bcrypt options
 * @param {function callback(err, token)} callback has access to err object and results
 * @return {object} decoded object from JWT
 */
const verify = ({
    token,
    options,
    callback
}) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(
                token,
                process.env.JWT_SECRET,
                options,
                !callback ? (err, decoded) => !err ? resolve(decoded) : reject(err) : callback)
        } catch (err) {
            reject(new Error(err))
        }
    })
}
/**
 * Exports
 */
module.exports = {
    sign: sign,
    verify: verify
}