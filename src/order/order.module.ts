import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CommonModule } from 'src/common/common.module';
import { EventsModule } from 'src/events/events.module';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from './order-product.enity';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [
    DatabaseModule,
    CommonModule,
    EventsModule,
    TypeOrmModule.forFeature([Order, OrderProduct])
  ]
})
export class OrderModule {}
