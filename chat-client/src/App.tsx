import React, { FormEvent, useRef, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const input = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (input.current) {
      const message = input.current.value
      console.log(message)
      input.current.value = ''
      input.current.focus()
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

export default App
