import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

const allowedOrigins =
  process.env.NODE_ENV === 'development'
    ? ['http://localhost:5173', 'http://localhost:3000']
    : ['http://localhost:5173'];

const corsOptionsDelegate = function (req, callback) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const origin = req.header('Origin') || req.header('origin');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!origin || allowedOrigins.indexOf(origin) !== -1) {
    callback(null, {
      origin: true,
      methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
    });
  } else {
    callback(new Error('Not Allowed by CORS'), {
      origin: false,
    });
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptionsDelegate);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
