const server = require('./app')
server.listen(process.env.PORT, _ => console.log(`Server Listening on Port:${process.env.PORT}`))