import 'colors'
import cors from 'cors'
import express from 'express'
import {EventEmitter} from 'events'

const app = express()

const emitter = new EventEmitter()

app.use(cors())
app.use(express.json())

app.get('/connect', (req, res) => {
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
    })
    emitter.on('newMessage', message => {
        res.write(`data: ${JSON.stringify(message)} \n\n`)
    })
})

app.post('/new-message', (req, res) => {
    const {message, id} = req.body
    emitter.emit('newMessage', {message, id})
    res.status(200)
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`.blue.underline))
