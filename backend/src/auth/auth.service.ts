import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService,  // Inject ConfigService to get JWT_SECRET
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn({
    username,
    password,
  }: AuthCredentialsDto): Promise<{ accessToken: string }> {
    let user;
    let role = 'user';  // Default role is 'user'

    // Check for admin login
    if (username === 'admin') {
      const adminPassword = process.env.ADMIN_PASSWORD;  // Get from env variable
      if (password === adminPassword) {  // Compare with the password from .env file
        role = 'admin';
      } else {
        throw new UnauthorizedException('Invalid admin credentials');
      }
    } else {
      // Regular user login logic
      user = await this.userRepository.findOneBy({ username });
      if (user && (await bcrypt.compare(password, user.password))) {
        role = user.role;  // Get the role from the user entity
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    }

    // If user or admin is authenticated, generate JWT
    const payload: JwtPayload = { username, role };  // Add role to payload

    // Fetch JWT secret from ConfigService
    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new UnauthorizedException('JWT secret is not configured');
    }

    const accessToken: string = this.jwtService.sign(payload, { secret });  // Pass the secret explicitly
    return { accessToken };
  }
}
