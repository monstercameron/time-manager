/**
 * @author  earl Cameron
 * @description Employee manager
 */
/**
 * Dependencies
 */
const {
    Employer,
    Employee,
    Period,
    Hour,
    Day
} = require('../util/Database')
const response = require('../util/Response')
/**
 * API Handlers
 */
const assign = async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                id: req.body.employeeId
            }
        })
        for (aDate of req.body.dates) {
            const day = await Day.findOne({
                where: {
                    date: aDate.day.date
                }
            })
            const hours = await day.getHours()
            for (const hour of hours) {
                if (hour.dataValues.id >= aDate.day.time_slots.begin && hour.dataValues.id <= aDate.day.time_slots.end) {
                    hour.addEmployee(employee)
                }
            }
        }
        response({
            message: `yatta`,
            data: employee,
            status: 200,
            res: res
        })
    } catch (error) {
        response({
            message: `There was an error`,
            status: 400,
            error: error.message,
            res: res
        })
    }
}
const test = async (req, res) => {
    try {
        const a = await Day.findOne({
            where: {
                date: '8/12/2019'
            },
            include: [{
                model: Hour,
                include: {
                    model: Employee
                }
            }]
        })
        res.json(a)
    } catch (error) {
        res.json(error.message)
    }
}
/**
 * Exports
 */
module.exports = {
    assign,
    test
}