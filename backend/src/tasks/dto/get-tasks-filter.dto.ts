/* eslint-disable prettier/prettier */
import { IsEnum, IsOptional, IsString } from "class-validator";

import { TaskStatus } from "../tasks-status.enum";

/* eslint-disable prettier/prettier */
export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;

//@IsOptional()
 // @IsString()
  //role?: string; // Add filtering for role if needed
}
