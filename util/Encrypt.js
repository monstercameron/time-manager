/**
 * @author  Earl Cameron
 * @description Hash and compare hashes
 */
const bcrypt = require('bcrypt')
/**
 * @name Create
 * @description             Create a new hash from a plain text password
 * @param {string} password Value to be hashed
 * @returns {string}        hash
 */
const createHash = ({
    password
}) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                !err ? resolve(hash) : reject(err)
            })
        })
    })
}
/**
 * @name Compare
 * @description             Compares a password to a hashed password
 * @param {string} password value to check against hash
 * @param {string} hash     value to check against password
 * @returns {boolean}       if password matches hash
 */
const compareHash = ({
    password,
    hash
}) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, res) {
            !err ? resolve(res) : reject(err)
        });
    })
}
/**
 * Exports
 */
module.exports = {
    create: createHash,
    compare: compareHash
}