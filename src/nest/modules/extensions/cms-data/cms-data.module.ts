import { Module } from '@nestjs/common';
import { CmsDataController } from './cms-data.controller';
import { CmsDataService } from './cms-data.service';

@Module({
  controllers: [CmsDataController],
  providers: [CmsDataService]
})
export class CmsDataModule { }
