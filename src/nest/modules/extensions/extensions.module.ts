import { Module } from '@nestjs/common';
import { CmsDataModule } from './cms-data/cms-data.module';

@Module({
  imports: [CmsDataModule]
})
export class extensionsModule { }
