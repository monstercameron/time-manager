/**
 * Token decoding middleware
 */
const isAuthenticated = async (req, res, next) => {
    try {
        const token = await require('../util/Token').verify({
            token: req.cookies.token
        })
        res.locals.token
        next()
    } catch (error) {
        require('../util/Response')({
            message: `There was an error`,
            status: 401,
            error: error,
            res: res
        })
    }
}
module.exports = {
    isAuth: isAuthenticated
}