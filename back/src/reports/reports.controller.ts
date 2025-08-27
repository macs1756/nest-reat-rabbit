import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('/report')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Get()
  generateReport(@Query('roomId') roomId: string) {
    return this.reportService.generateReport(roomId);
  }
}
