/**
 * @author  Earl Cameron
 * @description Database Connection
 */
/**
 * Dependencies
 */
const seq = require('sequelize')
const {
    Hour,
    Day,
    Employee,
    Employer,
    Period
} = require('../model/index')
/**
 * Config
 */
const pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
}
/**
 * Database instance
 */
const DB = new seq(
    process.env.DB_NAME,
    process.env.DB_USER_NAME, process.env.DB_PASSWORD, {
        host: process.env.DB_URL,
        dialect: 'mysql',
        /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
        pool: pool
    })

/**
 * Model Instances
 */
const hour = Hour(DB, seq)
const day = Day(DB, seq)
const employee = Employee(DB, seq)
const employer = Employer(DB, seq)
const period = Period(DB, seq)
/**
 * Drop Tables
 */
// period.destroy({where: {}})
// employer.destroy({where: {}})
// employee.destroy({where: {}})
// day.destroy({where: {}})
// hour.destroy({where:{}})
/**
 *relationships
 */
day.hasMany(hour)
hour.belongsTo(day)
hour.hasMany(employee)
employee.belongsTo(hour)
employee.hasMany(period)
period.belongsTo(employee)
/**
 * Test DB authentication
 */
// DB
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     })
/**
 * Sync tables
 */
// DB.sync({
//     force: false
// })
// .then(() => {
//     console.log(`Database & tables created!`)
// })
/**
 * Exports
 */
module.exports = {
    seq:seq,
    DB: DB,
    Day: day,
    Hour: hour,
    Employee: employee,
    Employer: employer,
    Period: period
}