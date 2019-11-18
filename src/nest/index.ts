import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { MainModule } from './main.module';

export async function initialize (server) {
  const app = await NestFactory.create(
    MainModule,
    new ExpressAdapter(server)
  );

  app.setGlobalPrefix('api');

  await app.init();
}
