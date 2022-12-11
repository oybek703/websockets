import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import 'react-toastify/dist/ReactToastify.min.css'
import React from 'react'
import Socket from './components/Socket'
import { socket, WebSocketProvider } from './contexts/websocket.context'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <WebSocketProvider value={socket}>
      <Socket/>
      <ToastContainer theme='colored' />
    </WebSocketProvider>
  )
}

export default App
