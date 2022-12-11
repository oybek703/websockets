import React, { FormEvent, useContext, useEffect, useRef } from 'react'
import { WebSocketContext } from '../contexts/websocket.context'
import { toast } from 'react-toastify'

function Socket() {
  const socketContext = useContext(WebSocketContext)
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => {
    socketContext.on('connect', function() {
      console.log('Socket connected!')
    })
    socketContext.on('onMessage', function(data) {
      toast.info('onMessage event received!')
      console.log(data)
    })

    socketContext.on('onTaskCheck', function(data) {
      toast.info(data)
    })

    return function() {
      console.log('Unregistering socket...')
      socketContext.off('connect')
      socketContext.off('onMessage')
      socketContext.off('onTaskCheck')
    }
    //  eslint-disable-next-line
  }, [])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (input.current) {
      const message = input.current.value
      if (message) {
        socketContext.emit('newMessage', { message })
        input.current.value = ''
        input.current.focus()
      } else {
        toast.error('Message should not be empty!', { position: 'bottom-right' })
      }

    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <form onSubmit={handleSubmit}>
          <div className='card-body'>
            <label htmlFor='message' className='text-white text-start'>Message</label>
            <input
              ref={input}
              type='text' className='form-control' />
            <button className='btn btn-outline-success mt-2'>Send</button>
          </div>
        </form>
      </header>
    </div>
  )
}

export default Socket
