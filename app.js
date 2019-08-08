/**
 * @author Earl Cameron
 * @description Main app config
 */
require('dotenv').config()
const app = require('express')()
/**
 * Middleware
 */
app.use('/media', require('express').static(require('path').join(__dirname, '/views/build')))
app.use(require('body-parser').json())
app.use(require('cookie-parser')())
app.use(require('cors')())
/**
 * Config Routes
 */
app.use('/api', require('./api/index'))
app.get('/', (req, res) => res.send('Hello World'))
/**
 * Misc Fns
 */
//run on setup
//const setup = require('./setup')
const scratch = require('./test/scratchpad')
/**
 * Exports
 */
module.exports = app