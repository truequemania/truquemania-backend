import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('New client connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);
  }
}

 // @SubscribeMessage('mensaje')
  // handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
  //   console.log(data);
  //   this.server.emit('mensaje', data);
  //   // console.log(client.id);
  //   // client.broadcast.emit('mensaje', data);
  // }

// import {
//   WebSocketGateway,
//   WebSocketServer,
//   SubscribeMessage,
//   MessageBody,
//   ConnectedSocket,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { ChatsService } from './chats.service';

// @WebSocketGateway({ cors: { origin: '*' } })
// export class ChatsGateway {
//   @WebSocketServer()
//   server: Server;

//   constructor(private readonly chatsService: ChatsService) {}

//   @SubscribeMessage('joinChat')
//   handleJoinChat(
//     @MessageBody() data: { chatId: number },
//     @ConnectedSocket() client: Socket,
//   ) {
//     client.join(`chat-${data.chatId}`);
//     return { message: `Joined chat-${data.chatId}` };
//   }

//   @SubscribeMessage('sendMessage')
//   async handleSendMessage(
//     @MessageBody() data: { chatId: number; senderId: number; content: string },
//   ) {
//     const message = await this.chatsService.sendMessage(data);
//     this.server.to(`chat-${data.chatId}`).emit('newMessage', message);
//     return message;
//   }
// }
