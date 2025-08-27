// backend/src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Controller()
export class TasksController {
  constructor(private notificationsGateway: NotificationsGateway) {}

  @Get()
  getHello(): string {
    return 'NestJS + RabbitMQ is ready!';
  }

  @MessagePattern('report')
  handlePing(data: { roomId: string; msg: string }) {
    this.notificationsGateway.sendToUser(data.roomId, data.msg);

    console.log('📩 Отримали з RabbitMQ:', data);
    return `Ack: ${JSON.stringify(data)}`;
  }
}
