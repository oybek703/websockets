import 'colors'
import express from 'express'
import {join} from 'path'
import {createServer} from 'http'
import {Server} from 'socket.io'
import {formatMessage} from './utils/messages'

const app = express()

// Serve static files
app.use(express.static(join(__dirname, '../public')))

const server = createServer(app)

const io = new Server(server)

const botName = 'ChatCord Bot'

// Runs when client connects
io.on('connection', function (socket) {
    // Welcome user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'))


    // Runs when user connects
    socket.broadcast.emit('message', formatMessage(botName, 'New user joined chat!'))

    // Runs when user disconnects
    socket.on('disconnect', function () {
        io.emit('message', formatMessage(botName, 'User left the chat!'))
    })

    // Runs on new chat message
    socket.on('chatMessage', function (message) {
        io.emit('message', formatMessage('USER', message))
    })

})

const PORT = process.env.PORT || 5000
server.listen(
    PORT,
    () => console.log(`Server is running on port ${PORT}...`.blue.underline)
)
