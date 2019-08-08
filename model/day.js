/**
 * @author  Earl Cameron
 * @description Day model
 */
const Sequelize = require('sequelize')
module.exports = (sequelize, type) => {
    return sequelize.define('day', {
        date: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}