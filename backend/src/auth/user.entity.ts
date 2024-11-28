import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Task } from '../tasks/tasks.entity';

import { Role } from './role.enum';  // Import the Role enum

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,  // Set a default role if needed
  })
  role: Role;

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
