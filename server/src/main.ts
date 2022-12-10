import 'colors'
import cors from 'cors'
import express from 'express'
import {Server} from 'ws'
import {createServer} from 'http'

const app = express()

const server = createServer(app)

app.use(cors())
app.use(express.json())

interface ISocketMessage {
    event: string
    id: number
    username: string
}

const wss = new Server({server})

wss.on('connection', (socket, request) => {
    socket.on('message', (data, isBinary) => {
        const parsedData: ISocketMessage = JSON.parse(data.toString())
        switch (parsedData.event) {
            case 'connection':
                broadcastMessage(parsedData, parsedData.id)
                break
            default:
                broadcastMessage(parsedData, parsedData.id)
                break
        }
    })
})

function broadcastMessage(message: ISocketMessage, id: number) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

const PORT = 5000
server.listen(PORT, () => console.log(`Server is running on port ${PORT}...`.blue.underline))

