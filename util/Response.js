/**
 * @author Earl Cameron
 * @description Response Format
 * @param {string} message  unique message for response
 * @param {object} data     data object for response
 * @param {object} error    error object for response
 * @param {number} status   manual status code for response
 * @param {object} res      response object
 */
module.exports = ({
    message,
    data,
    error,
    status,
    cookie,
    res
}) => {
    if (cookie) res.cookie(cookie.name, cookie.value, {
        maxAge: cookie.age,
        httpOnly: true
    })
    return res.status(status).json({
        message: message,
        data: !data ? {} : data,
        error: !error ? {} : error
    })
}