import { Injectable } from '@nestjs/common';
import { PlatformProvider } from '../common/platform-provider.service';
import { apiStatus, apiError } from '../../../../lib/util';
import config from 'config';
import Ajv from 'ajv';
import reviewSchema from '../../../../models/order.schema';

@Injectable()
export class ReviewService {
  private platformAdapter

  constructor (private readonly platformProvider: PlatformProvider) {
    this.platformAdapter = this.platformProvider.getAdapter('review');
  }

  public create (response, body) {
    const validate = (new Ajv()).compile(reviewSchema);

    if (!validate(body)) {
      return apiStatus(response, validate.errors, 500);
    }

    body.review.review_status = config.get('review.defaultReviewStatus');
    this.platformAdapter.check(body.review)
      .then(result => apiStatus(response, result, 200))
      .catch(error => apiError(response, error));
  }
}
