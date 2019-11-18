import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { StockModule } from './stock/stock.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [CartModule, ProductModule, StockModule, ReviewModule]
})
export class apiModule { }
