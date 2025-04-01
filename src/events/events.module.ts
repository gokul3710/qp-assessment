import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { UserActivityEmitter } from './events.emitter';
import { DatabaseModule } from 'src/database/database.module';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events.entity';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Event]),
  ],
  providers: [EventsService, UserActivityEmitter],
  exports: [EventsService, UserActivityEmitter],
})
export class EventsModule {}
