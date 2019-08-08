/**
 * @author  Earl Cameron
 * @description Employer model
 */
const Sequelize = require('sequelize')
module.exports = (sequelize, type) => {
    return sequelize.define('employer', {
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}