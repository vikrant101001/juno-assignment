/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';// Make sure RolesGuard is in this module

import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [AuthModule],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
