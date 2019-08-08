/**
 * @author  Earl Cameron
 * @description Hour model
 */
const Sequelize = require('sequelize')
module.exports = (sequelize, type) => {
    return sequelize.define('hour', {
        time_slot: {
            type: Sequelize.INTEGER
        }
    })
}