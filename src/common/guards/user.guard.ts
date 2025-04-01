import { ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
  constructor(
    private userService: UserService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = await super.canActivate(context);

    if (!result) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    try {

      if (user.role === 'admin') {
        request.user = {
          ...user,
          role: 'admin',
        };
        return true;
      }

      if (user.role === 'user' || !user.role) {

        request.user = {
          ...user,
          role: 'user',
        };

        return true;
      }

      throw new UnauthorizedException('User validation failed');
    } catch (error) {
      throw new UnauthorizedException('User validation failed');
    }
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user || user instanceof HttpException) {
      throw new HttpException('Invalid Token', 401);
    }
    return user;
  }
}
