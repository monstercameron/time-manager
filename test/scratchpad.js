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

// const scratch = async () => {
//     try {
//         const aDay = await Day.findOne()
//         const aHour = await Hour.findOne()
//         console.log(aHour)
//         aDay.addHour(aHour)
//     } catch (err) {
//         console.log(err)
//     }
// }
///////////////////////////////////////
// const {
//     sign,
//     verify
// } = require('../util/Token')
// const scratch = async () => {
//     const opts = {
//         payload: {
//             test: 'a'
//         },
//         options: {},
//         //callback:(test,token) => console.log('callback fn:',token,test)
//     }
//     try {
//         const doSign = await sign(opts)
//         console.log('Token: ', doSign)
//         const canVerify = await verify({token:doSign})
//         console.log(canVerify)
//     } catch (err) {
//         console.error(err)
//     }
// }

// scratch()