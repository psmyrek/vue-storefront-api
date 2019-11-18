import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { PlatformProvider } from '../common/platform-provider.service';

@Module({
  controllers: [StockController],
  providers: [StockService, PlatformProvider]
})
export class StockModule { }
