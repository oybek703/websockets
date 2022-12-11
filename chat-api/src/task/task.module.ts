import { Module } from '@nestjs/common'
import { TaskService } from './task.service'
import { GatewayModule } from '../gateway/gateway.module'

@Module({
  providers: [TaskService],
  imports: [GatewayModule]
})
export class TaskModule {
}
