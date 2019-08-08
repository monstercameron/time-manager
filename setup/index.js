const DB = require('../util/Database')
const Seq = require('sequelize')
const {
    Hour,
    Day,
    Employee,
    Employer,
    Period
} = require('../model/index')
console.log(`Attempting to sync models to DB: '${process.env.DB_NAME}':`)

// setup hour
const hour = Hour(DB, Seq)

// setup day
const day = Day(DB, Seq)

// setup employee
const employee = Employee(DB, Seq)

// setup employer
const employer = Employer(DB, Seq)

// setup employer
const period = Period(DB, Seq)

// Drop tables
// period.destroy({where: {}})
// employer.destroy({where: {}})
// employee.destroy({where: {}})
// day.destroy({where: {}})
// hour.destroy({where:{}})

//relationships
day.hasMany(hour)
hour.belongsTo(day)

hour.hasMany(employee)
employee.belongsTo(hour)

employee.hasMany(period)
period.belongsTo(employee)

DB.sync({
        force: false
    })
    .then(() => {
        console.log(`Database & tables created!`)
    })