require('dotenv').config()
const server = require('express')()

// test importing db conn
//const DB = require('./util/Database')

//run on setup
//const setup = require('./setup')

const scratch = require('./test/scratchpad')

server.listen(process.env.PORT, _ => console.log(`Server Listening on Port:${process.env.PORT}`))