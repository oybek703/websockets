import 'colors'
import cors from 'cors'
import express from 'express'
import {EventEmitter} from 'events'

const app = express()

const emitter = new EventEmitter()

app.use(cors())
app.use(express.json())

app.get('get-message', (req, res) => {
    emitter.once('newMessage', message => {
        res.json(message)
    })
})

app.post('new-messages', (req, res) => {
    const {message} = req.body
    emitter.emit('newMessage', message)
    res.status(200)
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`.blue.underline))
