import React, {useEffect, useState} from 'react'
import axios from 'axios'

const EventSourcing = () => {
    const [value, setValue] = useState<string>('')
    const [messages, setMessages] = useState<{ message: string, id: number }[]>([])

    useEffect(  () => {
        ;(async () => await subscribe())()
    }, [subscribe])

    async function subscribe() {
        const source = new EventSource('http://localhost:5000/connect')
        source.onmessage = function (event: MessageEvent) {
            setMessages(prevState => [...prevState, JSON.parse(event.data)])
        }

    }

    async function handleSend(event: React.FormEvent) {
        event.preventDefault()
        await axios.post(
            'http://localhost:5000/new-message',
            {
                message: value,
                id: Date.now()
            }
        )
    }

    return (
        <div className="container border mt-4 rounded">
            <form onSubmit={handleSend} className="p-4">
                <input
                    value={value}
                    onChange={({target: {value}}) => setValue(value)}
                    type="text" className="form-control"/>
                <button className="btn btn-success mt-2">Send</button>
            </form>
            <ul className="list-group">
                {messages.map(({message, id}) => <li key={id} className="list-group-item">{message}</li>)}
            </ul>
        </div>
    )
}

export default EventSourcing
