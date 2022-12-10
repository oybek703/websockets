import React, {useEffect, useState} from 'react'
import axios from 'axios'

const LongPulling = () => {
    const [value, setValue] = useState<string>('')
    const [messages, setMessages] = useState<{ message: string, id: number }[]>([])

    useEffect(() => {
        ;(async () => await subscribe())()
    }, [subscribe])

    async function subscribe() {
        try {
            const {data} = await axios.get('http://localhost:5000/get-messages')
            setMessages(prevState => [...prevState, data])
            await subscribe()
        } catch (e) {
            setTimeout(async () => {
                await subscribe()
            }, 500)
        }
    }

    async function handleSend(event: React.FormEvent) {
        event.preventDefault()
        if (value) {
            axios.post(
                'http://localhost:5000/new-message',
                {
                    message: value,
                    id: Date.now()
                }
            ).then(() => {
                setValue('')
            })
        }
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
            <ul className='list-group'>
                {messages.map(({message, id}) => <li key={id} className='list-group-item'>{message}</li>)}
            </ul>
        </div>
    )
}

export default LongPulling
