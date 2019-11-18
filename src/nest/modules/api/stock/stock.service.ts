import { Injectable } from '@nestjs/common';
import { PlatformProvider } from '../common/platform-provider.service';
import { apiStatus, apiError } from '../../../../lib/util';
import config from 'config';

@Injectable()
export class StockService {
  private platformAdapter

  constructor (private readonly platformProvider: PlatformProvider) {
    this.platformAdapter = this.platformProvider.getAdapter('stock');
  }

  private getStockId (storeCode, stockId = null) {
    if (!config.get('msi.enabled')) {
      return null;
    }

    const storeView = config.get('storeViews')[storeCode];

    return stockId || (storeView
      ? storeView.msi.stockId
      : config.get('defaultStockId')
    );
  }

  public check (response, skuParam, skuQuery, stockId, storeCode) {
    if (!skuParam && !skuQuery) {
      return apiStatus(response, 'sku parameter is required', 500);
    }

    this.platformAdapter.check({
      sku: skuParam || skuQuery,
      stockId: this.getStockId(storeCode, stockId)
    }).then(result => apiStatus(response, result, 200))
      .catch(error => apiError(response, error));
  }

  public list (response, skus, storeCode) {
    if (!skus) {
      return apiStatus(response, 'skus parameter is required', 500);
    }

    const stockId = this.getStockId(storeCode);
    const promises = skus.split(',').map(sku => this.platformAdapter.check({ sku, stockId }));

    Promise.all(promises)
      .then(result => apiStatus(response, result, 200))
      .catch(error => apiError(response, error));
  }
}
