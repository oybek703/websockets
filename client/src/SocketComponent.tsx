import React, {FormEvent, useRef, useState} from 'react'

const SocketComponent = () => {
    const socket = useRef<WebSocket>()
    const [userMessage, setUserMessage] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [messages, setMessages] = useState<{ message: string, id: number }[]>([])
    const [connected, setConnected] = useState<boolean>(false)

    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')
        socket.current.onopen = function () {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current?.send(JSON.stringify(message))
        }
        socket.current.onmessage = function (event) {
            setMessages(prevState => [...prevState, JSON.parse(event.data)])
        }

    }

    function handleSendMessage(event: FormEvent) {
        event.preventDefault()
        socket.current?.send(JSON.stringify({message: userMessage, id: Date.now()}))
        setUserMessage('')
    }

    function handleEnter(event: FormEvent) {
        event.preventDefault()
        connect()
    }

    if (!connected) {
        return <div className="container border mt-4 rounded">
            <form onSubmit={handleEnter} className="p-4">
                <input
                    value={username}
                    onChange={({target: {value}}) => setUsername(value)}
                    type="text" className="form-control"/>
                <button className="btn btn-success mt-2">Enter chat</button>
            </form>
            <ul className="list-group">
                {messages.map(({message, id}) => <li key={id} className="list-group-item">{message}</li>)}
            </ul>
        </div>
    }

    return (
        <div className="container border mt-4 rounded">
            <form onSubmit={handleSendMessage} className="p-4">
                <input
                    value={userMessage}
                    onChange={({target: {value}}) => setUserMessage(value)}
                    type="text" className="form-control"/>
                <button className="btn btn-success mt-2">Send</button>
            </form>
            <ul className="list-group">
                {messages.map(({message, id}) => <li key={id} className="list-group-item">{message}</li>)}
            </ul>
        </div>
    )
}

export default SocketComponent
