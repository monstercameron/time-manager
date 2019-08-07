require('dotenv').config()
const server = require('express')()
server.listen(process.env.PORT, _ => console.log(`Server Listening on Port:${process.env.PORT}`))