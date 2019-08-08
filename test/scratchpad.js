const {
    seq,
    DB,
    Day,
    Hour
} = require('../util/Database')

// day.create({
//     date: 'test'
// })

// hour.create({
//     time_slot:1
// })

const scratch = async () => {
    try {
        const aDay = await Day.findOne()
        const aHour = await Hour.findOne()
        console.log(aHour)
        aDay.addHour(aHour)
    } catch (err) {
        console.log(err)
    }
}

scratch()