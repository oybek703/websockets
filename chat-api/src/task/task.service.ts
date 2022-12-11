import { Injectable, Logger } from '@nestjs/common'
import { EventGateway } from '../gateway/event.gateway'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name)
  constructor(private readonly gateWay: EventGateway) {
  }

  @Cron('*/10 * * * * *')
  handleTask() {
    this.gateWay.socket.emit('onTaskCheck', 'Task checked and everything is ok!')
    this.logger.log('Called every 10 seconds!')
  }

}
