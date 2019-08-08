/**
 * Response Formate
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
        data: !data ? {} : error,
        error: !error ? {} : error
    })
}