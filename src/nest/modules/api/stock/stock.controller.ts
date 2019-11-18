import { Controller, Get, Query, Param, Res } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor (private readonly stockService: StockService) { }

  @Get('check/:sku?')
  public check (@Res() response, @Param('sku') skuParam, @Query('sku') skuQuery, @Query('stockId') stockId, @Query('storeCode') storeCode) {
    this.stockService.check(response, skuParam, skuQuery, stockId, storeCode);
  }

  @Get('list')
  public list (@Res() response, @Query('skus') skus, @Query('storeCode') storeCode) {
    this.stockService.list(response, skus, storeCode);
  }
}
