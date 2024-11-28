import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Admins can access everything
    if (user.role === 'admin') {
      return true; // Admin can access all tasks
    }

    // Users can access their own tasks
    if (user) {
      return true; // Allow user to access their own tasks (no role check for them)
    }

    // If no user role, deny access
    throw new UnauthorizedException('You do not have permission to access this resource');
  }
}
