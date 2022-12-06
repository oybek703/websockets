import express from 'express'
import {createServer} from 'http'
import {WebSocketServer} from 'ws'

const app = express()

const server = createServer(app)

const wss = new WebSocketServer({server})

wss.on('connection', socket => {
    socket.on('message', message => {
        let messageString = message.toString('utf-8')
        console.log(`received: ${message}`)
        const broadcastRegex = /^broadcast:/
        if (broadcastRegex.test(messageString)) {
            messageString = messageString.replace(broadcastRegex, '')
            wss.clients.forEach(client => {
                if (client !== socket) {
                    client.send(`Hello, broadcast message -> ${messageString}`)
                }
            })
        } else {
            socket.send(`Hello you sent -> ${messageString}`)
        }
    })
    socket.send('Hi, I am web socket server!')
})

server.listen(8999, () => {
    // @ts-ignore
    const {port} = server.address()
    console.log(`Server is started on port ${port}...`)
})
