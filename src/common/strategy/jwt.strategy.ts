import { Injectable, HttpException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { userJwtPayload } from '../interface/jwt-user.payload';
import { config } from 'dotenv';
config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() || '',
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: userJwtPayload) {
    if (!payload) {
      return new HttpException('Invalid Token', 401);
    }
    return payload;
  }
}
