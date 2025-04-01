import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [
        __dirname + '/../products/product.entity{.ts,.js}',
        __dirname + '/../user/user.entity{.ts,.js}',
        __dirname + '/../events/events.entity{.ts,.js}',
        __dirname + '/../order/order.entity{.ts,.js}',
        __dirname + '/../order/order-product.enity{.ts,.js}',
      ],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
