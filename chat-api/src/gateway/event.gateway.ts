import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { OnModuleInit } from '@nestjs/common'
import { Server } from 'socket.io'

@WebSocketGateway()
export class EventGateway implements OnModuleInit {

  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on('connection', function(socket) {
      console.log(socket.id)
      console.log('Connected!')
    })
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: unknown) {
    console.log(body)
    this.server.emit('onMessage', { message: 'Hi there!', content: body })
  }
}
