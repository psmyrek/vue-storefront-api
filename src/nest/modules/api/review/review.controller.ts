import { Controller, Post, Body, Res } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor (private readonly reviewService: ReviewService) { }

  @Post('create')
  public create (@Res() response, @Body() body) {
    this.reviewService.create(response, body);
  }
}
