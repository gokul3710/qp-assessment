import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { userJwtPayload } from '../interface/jwt-user.payload';

@Injectable()
export class RoleGuard implements CanActivate {

  async canActivate(context: ExecutionContext) {

    const allowedRoles = process.env.ROLES?.split(',').map(role => role.trim()) || [];

    const request = context.switchToHttp().getRequest<Request>();
    const user: userJwtPayload = (request as any).user as userJwtPayload;

    if (!allowedRoles.includes(user?.role)) {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }
}
