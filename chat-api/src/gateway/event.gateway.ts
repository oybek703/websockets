import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { OnModuleInit } from '@nestjs/common'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({cors: {origin: ['http://localhost:3000']}})
export class EventGateway implements OnModuleInit {

  @WebSocketServer()
  server: Server
  socket: Socket

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id)
      this.socket = socket
      console.log('Connected!')
    })
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: unknown) {
    console.log(body)
    this.socket.broadcast.emit('onMessage', body)
  }
}
