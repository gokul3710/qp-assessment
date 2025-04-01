import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';
import { JSendInterceptor } from './common/interceptors/jsend.interceptor';
import { OrderModule } from './order/order.module';

@Module({
  imports: [AuthModule, DatabaseModule, UserModule, CommonModule, ProductsModule, OrderModule],
  controllers: [AppController],
  providers: [AppService, JSendInterceptor],
})
export class AppModule {}
