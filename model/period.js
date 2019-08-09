/**
 * @author  Earl Cameron
 * @description Hour model
 */
const Sequelize = require('sequelize')
module.exports = (sequelize, type) => {
    return sequelize.define('period', {
        begin: {
            type: Sequelize.INTEGER
        },
        end: {
            type: Sequelize.INTEGER
        },
        name:{
            type: Sequelize.STRING,
            allowNull: true
        }
    })
}