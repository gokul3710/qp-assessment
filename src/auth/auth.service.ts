import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/singup.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { BaseResponse, ErrorResponse, SuccessResponse } from 'src/common/types/response.type';
import { Events } from 'src/common/constants/events';
import { UserActivityEmitter } from 'src/events/events.emitter';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: UserActivityEmitter
  ) { }

  async login(user: LoginDto): Promise<BaseResponse> {

    try {
      const userData = await this.userRepository.findOne({ where: { email: user.email } });
      if (!userData) {
        throw new ErrorResponse("User not found", 404);
      }

      const isMatch = await bcrypt.compare(user.password, userData.password);
      if (!isMatch) {
        throw new ErrorResponse("Invalid credentials", 401);
      }

      const payload = { email: userData.email, userId: userData.id, role: "user" };

      return new SuccessResponse({
        access_token: this.jwtService.sign(payload, {
          expiresIn: '1d',
        }),
        user: {
          email: userData.email,
          userId: userData.id
        }
      });
    } catch (error) {

      if (error instanceof ErrorResponse) {
        throw error;
      }

      if (error.message) {
        throw new ErrorResponse(error.message, 500);
      }

      throw new ErrorResponse("Internal Server Error", 500);

    }
  }

  async signup(user: SignupDto) {

    try {

      const userData = await this.userRepository.findOne({ where: { email: user.email } });
      if (userData) {
        throw new ErrorResponse("User already exists", 409);
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = this.userRepository.create({ ...user, password: hashedPassword, createdAt: new Date(), updatedAt: new Date() });

      await this.userRepository.save(newUser);

      const payload = { email: user.email, userId: newUser.id, role: "user" };

      this.eventEmitter.emit(Events.USER_SIGNUP, { email: user.email, userId: newUser.id });

      return new SuccessResponse({
        user: {
          email: user.email,
          userId: newUser.id
        }
      })
    } catch (error) {

      if (error instanceof ErrorResponse) {
        throw error;
      }

      if (error.message) {
        throw new ErrorResponse(error.message, 500);
      }

      throw new ErrorResponse("Internal Server Error", 500);

    }
  }

  async adminLogin(user: LoginDto): Promise<BaseResponse> {

    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;


      if (user.email !== adminEmail || user.password !== adminPassword) {
        throw new ErrorResponse("Invalid credentials", 401);
      }

      const payload = { email: user.email, role: "admin" };

      return new SuccessResponse({
        access_token: this.jwtService.sign(payload, {
          expiresIn: '1d',
        })
      });
    } catch (error) {

      if (error instanceof ErrorResponse) {
        throw error;
      }

      if (error.message) {
        throw new ErrorResponse(error.message, 500);
      }

      throw new ErrorResponse("Internal Server Error", 500);

    }
  }
}
