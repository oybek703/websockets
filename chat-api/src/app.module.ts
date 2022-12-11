import { Module } from '@nestjs/common'
import { GatewayModule } from './gateway/gateway.module'
import { ScheduleModule } from '@nestjs/schedule'
import { TaskModule } from './task/task.module'

@Module({
  imports: [ScheduleModule.forRoot(), GatewayModule, TaskModule]
})
export class AppModule {
}
