// backend/src/gateway/notifications.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  private clients: Map<string, string> = new Map();

  handleConnection(client: Socket) {
    const roomId = client.handshake.query.roomId as string;
    if (roomId) {
      this.clients.set(roomId, client.id);
      console.log(`User connected: ${roomId} -> ${client.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    for (const [roomId, socketId] of this.clients.entries()) {
      if (socketId === client.id) {
        this.clients.delete(roomId);
        console.log(`User disconnected: ${roomId}`);
        break;
      }
    }
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: { roomId: string; msg: string }) {
    const targetSocketId = this.clients.get(data.roomId);
    if (targetSocketId) {
      this.server.to(targetSocketId).emit('message', data.msg);
    }
  }

  sendToUser(roomId: string, msg: string) {
    const targetSocketId = this.clients.get(roomId);

    if (targetSocketId) {
      this.server.to(targetSocketId).emit('message', msg);
    }
  }
}
