import { Module } from '@nestjs/common';
import { extensionsModule } from './modules/extensions/extensions.module';
import { apiModule } from './modules/api/api.module';

@Module({
  imports: [extensionsModule, apiModule]
})
export class MainModule { }
