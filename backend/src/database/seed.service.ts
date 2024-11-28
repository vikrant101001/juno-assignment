/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity'; // Adjust path as necessary
import { Role } from '../auth/role.enum'; // Import the Role enum
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async seed() {
    // Check if admin user already exists
    const adminExists = await this.userRepository.findOne({ where: { username: 'admin' } });
    if (adminExists) {
      console.log('Admin user already exists, skipping admin creation');
      return;
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(this.configService.get('ADMIN_PASSWORD'), 10);

    // Create and save the admin user
    const adminUser = this.userRepository.create({
      username: 'admin',
      password: hashedPassword,
      role: Role.ADMIN, // Assign the admin role from the enum
    });

    await this.userRepository.save(adminUser);
    console.log('Admin user created with username: admin');
  }
}
