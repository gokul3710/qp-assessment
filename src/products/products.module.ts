import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CommonModule } from 'src/common/common.module';
import { Product } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    CommonModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Product]),
    EventsModule
  ]
})
export class ProductsModule {}
