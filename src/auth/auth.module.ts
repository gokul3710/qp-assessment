import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    CommonModule,
    EventsModule
  ]
})
export class AuthModule {}
