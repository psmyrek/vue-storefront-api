import { Controller, Get, Query, Res } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor (private readonly productService: ProductService) { }

  @Get('list')
  public getList (@Res() response, @Query('skus') skus) {
    this.productService.getList(response, skus);
  }

  @Get('render-list')
  public renderList (@Res() response, @Query('skus') skus, @Query('currencyCode') currencyCode, @Query('storeId') storeId) {
    this.productService.renderList(response, skus, currencyCode, storeId);
  }
}
