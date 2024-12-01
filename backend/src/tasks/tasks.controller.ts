import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiBody } from '@nestjs/swagger'; // Import Swagger decorators
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Tasks') // Swagger grouping
@ApiBearerAuth('JWT-auth') // Specify the security scheme name
@Controller('tasks')
@UseGuards(AuthGuard()) // All requests require authentication
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(private taskService: TasksService) {}

  @Get()
  @UseGuards(RolesGuard) // Allow both admin and users based on RolesGuard logic
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.taskService.getTasks(filterDto, user); // Admin can view all tasks, users can only view their own tasks
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a task by ID for the logged-in user' })
  @ApiResponse({ status: 200, description: 'Task retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user); // Users can view their own task by ID
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task for the logged-in user' })
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiBody({
    description: 'Task creation data',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'My Task' },
        description: { type: 'string', example: 'This is a sample task.' },
      },
      required: ['title', 'description'],
    },
  })
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" creating a new task. Data: ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return this.taskService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard) // Ensure the admin can delete any task
  @ApiOperation({ summary: 'Delete a task by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.taskService.deleteTask(id, user); // Admin can delete any task
  }

  @Patch('/:id/status')
  @UseGuards(RolesGuard) // Ensure the admin can update any task's status
  @ApiOperation({ summary: 'Update a task status by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Task status updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    description: 'Task status update data',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['OPEN', 'DONE'],
          example: 'OPEN',
        },
      },
      required: ['status'],
    },
  })
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status, user);
  }
}
