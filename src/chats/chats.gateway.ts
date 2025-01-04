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
export class ChatsGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Nuevo cliente conectado', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado', client.id);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.userId);
    console.log(`Usuario ${data.userId} unido a la sala ${data.userId}`);
    return { message: `Te has unido a la sala ${data.userId}` };
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(
    @MessageBody() data: { senderId: string; receiverId: string; content: string },
  ) {
    this.server.to(data.receiverId).emit('receiveMessage', {
      senderId: data.senderId,
      content: data.content,
    });
    console.log(
      `Mensaje de ${data.senderId} para ${data.receiverId}: ${data.content}`,
    );
    return { status: 'Mensaje enviado' };
  }
}

