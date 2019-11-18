import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PlatformProvider } from '../common/platform-provider.service';

@Module({
  controllers: [CartController],
  providers: [CartService, PlatformProvider]
})
export class CartModule { }
