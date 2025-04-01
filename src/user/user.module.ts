import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CommonModule } from 'src/common/common.module';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  providers: [UserService],
  imports: [
    CommonModule,
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
  ],
  exports: [UserService]
})
export class UserModule {}
