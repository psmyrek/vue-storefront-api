import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PlatformProvider } from '../common/platform-provider.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PlatformProvider]
})
export class ProductModule { }
