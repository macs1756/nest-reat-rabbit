/* eslint-disable @typescript-eslint/no-floating-promises */
import { Injectable } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class ReportsService {
  constructor(private tasksService: TasksService) {}

  generateReport(roomId) {
    this.tasksService.sendMsg('Почали генерацію', roomId);
    this.generation(roomId);
    return { message: 'Report was generated.' };
  }

  async generation(roomId) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await this.tasksService.sendMsg('Пройшло 25%', roomId);
    await new Promise((resolve) => setTimeout(resolve, 4000));
    await this.tasksService.sendMsg('Пройшло 50%', roomId);
    await new Promise((resolve) => setTimeout(resolve, 4000));
    await this.tasksService.sendMsg('Пройшло 75%', roomId);
    await new Promise((resolve) => setTimeout(resolve, 10000));

    await this.tasksService.sendMsg('Генерація завершено', roomId);
  }
}
