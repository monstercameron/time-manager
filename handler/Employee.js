/**
 * @author  earl Cameron
 * @description Employee manager
 */
/**
 * Dependencies
 */
// const {
//     range
// } = require('../util/Helper')
/**
 * Manual range fn import
 */
const range = (a, b, step) => {
    let A = [];
    if (typeof a == 'number') {
        A[0] = a;
        step = step || 1;
        while (a + step <= b) {
            A[A.length] = a += step;
        }
    } else {
        var s = 'abcdefghijklmnopqrstuvwxyz';
        if (a === a.toUpperCase()) {
            b = b.toUpperCase();
            s = s.toUpperCase();
        }
        s = s.substring(s.indexOf(a), s.indexOf(b) + 1);
        A = s.split('');
    }
    return A;
}
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
            const {
                begin,
                end
            } = aDate.day.time_slots
            const aRange = range(begin, end)
            for (const hour of aRange){
                console.log(hour)
            }
            // for (const hour of hours) {
            //     if (aRange.includes(hour.id)) {
            //         hour.addEmployee(employee)
            //     }
            // }
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
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: Hour,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Employee,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
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