import 'colors'
import express from 'express'
import {createServer} from 'http'
import {join} from 'path'
import {Server} from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server)

io.on('connection', function (socket) {
    socket.broadcast.emit('new-user-joined',`New user joined at ${new Date().toLocaleTimeString()}.`)
    socket.on('new-message', function (message) {
        io.emit('new-message', message)
    })
    socket.on('disconnect', function (reason) {
        console.group()
        console.log(reason)
        console.log('User disconnected!')
        console.groupEnd()
    })
})

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'templates', 'index.html'))
})

const PORT = 5000
server.listen(PORT, () => console.log(`Server is running on port ${PORT}...`.blue.underline))
