import { jwa } from 'jwa';
import { Injectable } from '@nestjs/common';
import { PlatformProvider } from '../common/platform-provider.service';
import { apiStatus, apiError, sgnSrc } from '../../../../lib/util';
import config from 'config';

@Injectable()
export class ProductService {
  private platformAdapter

  constructor (private readonly platformProvider: PlatformProvider) {
    this.platformAdapter = this.platformProvider.getAdapter('product');
  }

  public getList (response, skus) {
    if (!skus) {
      return apiStatus(response, 'skus parameter is required', 500);
    }

    this.platformAdapter.list(skus.split(','))
      .then(result => apiStatus(response, result, 200))
      .catch(error => apiError(response, error));
  }

  public renderList (response, skus, currencyCode, storeId) {
    if (!skus) {
      return apiStatus(response, 'skus parameter is required', 500);
    }

    this.platformAdapter.renderList(skus.split(','), currencyCode, parseInt(storeId) || 1)
      .then(result => {
        result.items.forEach(item => {
          const sgnObj = config.get('tax.calculateServerSide')
            ? { priceInclTax: item.price_info.final_price }
            : { price: item.price_info.extension_attributes.tax_adjustments.final_price };

          item.sgn = jwa('HS256').hmac.sign(
            sgnSrc(sgnObj, item),
            config.get('objHashSecret')
          );
        });

        apiStatus(response, result, 200);
      })
      .catch(error => apiError(response, error));
  }
}
