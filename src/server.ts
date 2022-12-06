import express from 'express'
import {createServer} from 'http'
import {WebSocket, WebSocketServer} from 'ws'

const app = express()

const server = createServer(app)

const wss = new WebSocketServer({server})

wss.on('connection', (ws: WebSocket & {isAlive?: boolean}) => {

    ws.isAlive = true

    ws.on('pong', () => {
        ws.isAlive = true
    })

    ws.on('message', message => {
        let messageString = message.toString('utf-8')
        console.log(`received: ${message}`)
        const broadcastRegex = /^broadcast:/
        if (broadcastRegex.test(messageString)) {
            messageString = messageString.replace(broadcastRegex, '')
            wss.clients.forEach(client => {
                if (client !== ws) {
                    client.send(`Hello, broadcast message -> ${messageString}`)
                }
            })
        } else {
            ws.send(`Hello you sent -> ${messageString}`)
        }
    })
    ws.send('Hi, I am web ws server!')
})

setInterval(() => {
    wss.clients.forEach((ws: WebSocket & {isAlive?: boolean}) => {
        if (!ws.isAlive) return ws.terminate()
        ws.isAlive = false
        ws.ping(null, false)
    })
}, 10000)

server.listen(8999, () => {
    // @ts-ignore
    const {port} = server.address()
    console.log(`Server is started on port ${port}...`)
})
