import 'colors'
import cors from 'cors'
import express from 'express'
import {EventEmitter} from 'events'

const app = express()

const emitter = new EventEmitter()

app.use(cors())
app.use(express.json())

app.get('/get-messages', (req, res) => {
    emitter.once('newMessage', message => {
        res.json({...message})
    })
})

app.post('/new-message', (req, res) => {
    console.log(req.body)
    const {message, id} = req.body
    emitter.emit('newMessage', {message, id})
    res.status(200)
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`.blue.underline))
