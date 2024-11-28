import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './tasks-status.enum';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    if (user.role === 'admin') {
      // Admin can see all tasks
      return this.taskRepository.getTasks(filterDto, user);
    } else {
      // Regular users can see only their own tasks
      return this.taskRepository.getTasks(filterDto, user); // Ensure you are filtering by user
    }
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    // If the user is admin, allow fetching any task
    const query = user.role === 'admin' ? {} : { user };
    const found = await this.taskRepository.findOneBy({ ...query, id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    // Admin can delete any task, otherwise only the task creator can delete their task
    const result = user.role === 'admin'
      ? await this.taskRepository.delete({ id }) // Admin can delete any task
      : await this.taskRepository.delete({ id, user }); // Regular users can only delete their tasks

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    // Admin can update the status of any task, else only the task creator can update
    const task = user.role === 'admin' 
      ? await this.taskRepository.findOne({ where: { id } }) // Admin can access any task
      : await this.getTaskById(id, user); // Regular users can only update their own task

    task.status = status;
    await this.taskRepository.save(task);

    return task;
  }
}
