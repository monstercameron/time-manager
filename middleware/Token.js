/**
 * Token decoding middleware
 */
const isAuthenticated = async (req, res, next) => {
    try {
        const token = await require('../util/Token').verify(req.cookies.token)
        res.locals.token
        next()
    } catch (error) {
        next(error)
    }
}
module.exports = {
    isAuth: isAuthenticated
}