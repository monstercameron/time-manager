/**
 * @author Earl Cameron
 * @description Manage dates
 */
/**
 * @name CreateDate
 * @description Creates a date string
 */
const createDate = () => {
    const date = new Date()
    return `${date.getMonth()+1}/${date.getDate()}/${date.getUTCFullYear()}`
}
/**
 * @name GetTimeNowInMilliSec
 * @description Gets the current time in milliseconds
 */
const getTimeNowInMilliSec = () => {
    return new Date().getTime()
}
/**
 * Exports
 */
module.exports = {
    createDate,
    getTimeNowInMilliSec
}