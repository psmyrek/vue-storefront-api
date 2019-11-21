import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { PlatformProvider } from '../common/platform-provider.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, PlatformProvider]
})
export class ReviewModule { }
