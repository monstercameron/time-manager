/**
 * @author Earl Cameron
 * @description Date handler
 */
const {
    Day,
    Hour
} = require('../util/Database')
const {
    futureDate,
    createDate
} = require('../util/Date')
const response = require('../util/Response')
/**
 * @name NewWeek
 * @description creates a set of Days and Hours representing a new week
 * @todo Use environment variable to manage work week ad workday lengths
 */
const newWeek = async (req, res) => {
    try {
        const aHour = 1000 * 60 * 60
        const aDay = aHour * 24
        const week = {
            week: {
                days: 5,
                start: 0,
                end: 5
            },
            day: {
                start: 7,
                end: 17
            }
        } // work day 24h clock
        for (let i = 0; i < week.week.days; i++) {
            const day = await Day.create({
                date: createDate({
                    date: futureDate({
                        offset: i + weekStart()
                    })
                })
            })
            for (let x = week.day.start; x < week.day.end; x++) {
                const hour = await Hour.create({
                    time_slot: x
                })
                day.addHour(hour)
            }
        }
        response({
            message: `Week started for: ${createDate({
                date: futureDate({
                    offset: weekStart()
                })
            })}`,
            status: 200,
            res: res
        })
    } catch (error) {
        response({
            message: `There was an error.`,
            error: error.message,
            status: 500,
            res: res
        })
    }
}
/**
 * @name WeekStart
 * @description returns future date when the next work week starts
 * @todo extend this for manual starting point
 */
const weekStart = () => {
    const date = new Date()
    return 7 - date.getDay() + 1
    //return futureDate({offset:daysUntilMonday})
}
/**
 * @name GetDay
 * @description get a specified day
 */
const getDay = async (req, res) => {
    try {
        const day = await Day.findOne({
            where: {
                date: req.body.date
            }
        })
        response({
            message: `Requested day's hours:`,
            data: await day.getHours({
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'dayId']
                }
            }),
            status: 200,
            res: res
        })
    } catch (error) {
        response({
            message: `There was an error.`,
            error: error.message,
            status: 500,
            res: res
        })
    }
}
/**
 * Exports
 */
module.exports = {
    newWeek,
    getDay
}