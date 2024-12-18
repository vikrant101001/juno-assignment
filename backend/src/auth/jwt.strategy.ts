import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UsersRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate({ username, role }: JwtPayload): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    // If the role is 'admin', allow full access
    if (role === 'admin') {
      // You can add any additional logic to check if the user has admin permissions
    }

    return user;
  }
}
