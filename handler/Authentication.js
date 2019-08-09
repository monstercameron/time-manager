/**
 * @author  earl Cameron
 * @description Authentication manager
 */
/**
 * Dependencies
 */
const {
    sign
} = require('../util/Token')
const {
    Employer,
    Employee,
    Period,
    Day
} = require('../util/Database')
const {
    create,
    compare
} = require('../util/Encrypt')
const {
    validateFields
} = require('../util/Validator')
const {
    NoSelectedRoleError,
    IncorrectPasswordError
} = require('../util/Error')
const {
    createDate,
    getTimeNowInMilliSec
} = require('../util/Date')
const response = require('../util/Response')
/**
 * API Handlers
 */
const test = async (req, res) => {
    try {

        const token = await sign({
            payload: {
                test: 'this was a test'
            }
        })
        const cookie = {
            name: 'token',
            value: token,
            age: 1000 * 60 * 60 //1 hour
        }
        response({
            message: `you got a cookie :) ${token}`,
            cookie: cookie,
            status: 200,
            res: res
        })
    } catch (error) {
        response({
            message: `you didn't get a cookie :)`,
            status: 500,
            error: error,
            res: res
        })
    }
}
/**
 * @name RegisterSwitch
 * @description routes the request depending on the role
 */
const registerSwitch = (req, res) => {
    try {
        switch (req.query.role) {
            case 'employer':
                registerEmployer(req, res)
                break
            case 'employee':
                registerEmployee(req, res)
                break
            default:
                throw new NoSelectedRoleError('No role specified for registry.')
        }
    } catch (error) {
        response({
            message: `There was an error`,
            status: 400,
            error: error.message,
            res: res
        })
    }
}
/**
 * @name RegisterEmployer
 * @description register a new employer
 * @TODO remove recovery_hash field
 */
const registerEmployer = async (req, res) => {
    const opts = {
        required: [{
                field: 'email',
                nullable: false
            },
            {
                field: 'fname',
                nullable: false
            },
            {
                field: 'lname',
                nullable: false
            },
            {
                field: 'password',
                nullable: false
            },
            {
                field: 'question',
                nullable: false
            },
            {
                field: 'answer',
                nullable: false
            }
        ],
        body: req.body
    }
    try {
        await validateFields(opts)
        Employer.create({
                first_name: req.body.fname,
                last_name: req.body.lname,
                email: req.body.email,
                hash: await create({
                    password: req.body.password
                }),
                recover_question: req.body.question,
                recovery_hash: await create({
                    password: req.body.question + req.body.answer
                })
            })
            .then(employer => {
                console.log("Employer's auto-generated ID:", employer.id)
                console.log(employer.dataValues)
                response({
                    message: `Employer's auto-generated ID:${employer.id}`,
                    data: employer.dataValues,
                    status: 200,
                    res: res
                })
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
/**
 * @name registerEmployee
 * @description Registers a new employee
 */
const registerEmployee = async (req, res) => {
    const opts = {
        required: [{
                field: 'fname',
                nullable: false
            },
            {
                field: 'lname',
                nullable: false
            }
        ],
        body: req.body
    }
    try {
        await validateFields(opts)
        Employee.create({
                first_name: req.body.fname,
                last_name: req.body.lname
            })
            .then(employee => {
                console.log("Employee's auto-generated ID:", employee.id)
                console.log(employee.dataValues)
                response({
                    message: `Employee's auto-generated ID:${employee.id}`,
                    data: employee.dataValues,
                    status: 200,
                    res: res
                })
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
/**
 * @name login
 * @description user submits email and password to receive a JWT
 */
const login = async (req, res) => {
    const opts = {
        required: [{
                field: 'email',
                nullable: false
            },
            {
                field: 'password',
                nullable: false
            }
        ],
        body: req.body
    }
    try {
        await validateFields(opts)
        const query = await Employer.findOne({
            where: {
                email: req.body.email
            }
        })
        const checkHash = await compare({
            password: req.body.password,
            hash: query.hash
        })
        if (checkHash) {
            const token = await sign({
                payload: {
                    test: 'this was a test'
                }
            })
            const cookie = {
                name: 'token',
                value: token,
                age: 1000 * 60 * 60 //1 hour
            }
            response({
                message: `Succesfully logged in`,
                cookie: cookie,
                status: 200,
                res: res
            })
        } else throw new IncorrectPasswordError(`The submitted password didn't match any records.`)
    } catch (error) {
        let status = 400
        if (error.name === 'IncorrectPasswordError') status = 401
        response({
            message: `There was an error`,
            status: status,
            error: error.message,
            res: res
        })
    }
}
/**
 * @name reset
 * @description Reset employer password
 */
const reset = async (req, res) => {
    const opts = {
        required: [{
                field: 'email',
                nullable: false
            },
            {
                field: 'password',
                nullable: false
            },
            {
                field: 'question',
                nullable: false
            },
            {
                field: 'answer',
                nullable: false
            }
        ],
        body: req.body
    }
    try {
        validateFields(opts)
        const query = await Employer.findOne({
            where: {
                email: req.body.email
            }
        })
        const checkHash = await compare({
            password: req.body.question + req.body.answer,
            hash: query.recovery_hash
        })
        if (checkHash) {
            await query.update({
                hash: await create({
                    password: req.body.password
                })
            })
            response({
                message: `Succesfully reset password`,
                status: 200,
                res: res
            })
        } else throw new IncorrectPasswordError(`The submitted security question and answer didn't match any records.`)
    } catch (error) {
        response({
            message: `There was an error`,
            status: 400,
            error: error.message,
            res: res
        })
    }
}
/**
 * @name ClockIn
 * @description Employee clock in
 */
const clockIn = async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                id: req.body.id
            }
        })
        const day = await Day.findOne({
            where: {
                date: createDate()
            }
        })
        const period = await Period.build({
            begin:getTimeNowInMilliSec()
        })
        employee.addPeriod(period)
        

        res.json({day,period})

    } catch (error) {
        response({
            message: `There was an error`,
            status: 400,
            error: error.message,
            res: res
        })
    }
}
module.exports = {
    test,
    registerSwitch,
    login,
    reset,
    clockIn
}