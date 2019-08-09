/**
 * @author Earl Cameron
 * @description Date API
 */
const router = require('express').Router()
const {
    newWeek,
    getDay
} = require('../handler/Date')
module.exports = router
    .get('/', (req, res) => res.send('' + require('../util/Date').futureDate({
        offset: 2
    })))
    .post('/newweek', newWeek)
    .post('/getday', getDay)