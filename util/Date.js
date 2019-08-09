/**
 * @author Earl Cameron
 * @description Manage dates
 */
/**
 * @name CreateDate
 * @description Creates a date string
 */
const createDate = ({
    date
}) => {
    const aDate = new Date((date ? date : null))
    return `${aDate.getMonth()+1}/${aDate.getDate()}/${aDate.getUTCFullYear()}`
}
/**
 * @name GetTimeNowInMilliSec
 * @description Gets the current time in milliseconds
 */
const getTimeNowInMilliSec = () => {
    return new Date().getTime()
}
/**
 * @name FutureDate
 * @description gets a future date based off an offset
 * @param {number} offset days in the future
 * @returns {number} date in milliseconds
 */
const futureDate = ({
    offset = 0
}) => {
    const date = new Date()
    const aFutureDate = date.setDate(date.getDate() + offset)
    return aFutureDate
}
/**
 * Exports
 */
module.exports = {
    createDate,
    getTimeNowInMilliSec,
    futureDate
}