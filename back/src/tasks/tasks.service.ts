import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class TasksService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:1756@localhost:5672'],
        queue: 'report',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  sendMsg(msg, TASK_ID) {
    return this.client.send('report', { msg, roomId: TASK_ID }).toPromise();
  }
}
