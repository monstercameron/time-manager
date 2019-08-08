/**
 * JWT Signing and verifying
 */
const jwt = require('jsonwebtoken')
/**
 * Sign JWT
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
 * Verify JWT
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
                !callback ? (err, decoded) => !err? resolve(decoded):reject(err) : callback)
        } catch (err) {
            reject(new Error(err))
        }
    })
}

module.exports = {
    sign:sign,
    verify:verify
}