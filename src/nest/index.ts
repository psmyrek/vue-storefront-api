import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ExtensionsModule } from './modules/extensions/extensions.module';
import { ApiModule } from './modules/api/api.module';

export async function initialize (server) {
  const apiModule = await NestFactory.create(
    ApiModule,
    new ExpressAdapter(server)
  );

  apiModule.setGlobalPrefix('api');
  await apiModule.init();

  const extensionsModule = await NestFactory.create(
    ExtensionsModule,
    new ExpressAdapter(server)
  );

  extensionsModule.setGlobalPrefix('api/ext');
  await extensionsModule.init();
};
