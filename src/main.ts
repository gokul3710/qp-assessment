import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import { JSendInterceptor } from './common/interceptors/jsend.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: process.env.CORS_ORIGIN?.split(','),
    methods: process.env.CORS_METHODS?.split(','),
    credentials: true,
  };

  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 100,
      message: 'Too many requests from this IP, please try again later.',
      headers: true,
    })
  );

  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

  app.useGlobalInterceptors(new JSendInterceptor());

  app.enableCors(corsOptions);

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
