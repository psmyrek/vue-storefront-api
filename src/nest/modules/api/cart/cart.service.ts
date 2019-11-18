import { Injectable } from '@nestjs/common';
import { PlatformProvider } from '../common/platform-provider.service';
import { apiStatus, apiError } from '../../../../lib/util';

@Injectable()
export class CartService {
  private platformAdapter

  constructor (private readonly platformProvider: PlatformProvider) {
    this.platformAdapter = this.platformProvider.getAdapter('cart');
  }

  private callPlatformMethod (methodName, response, ...params) {
    this.platformAdapter[methodName](...params)
      .then(result => apiStatus(response, result, 200))
      .catch(error => apiError(response, error));
  }

  public createCart (response, token) {
    this.callPlatformMethod('create', response, token);
  }

  public updateCartItem (response, token, cartId, cartItem) {
    if (!cartItem) {
      return apiStatus(response, 'No cartItem element provided within the request body', 500);
    }

    this.callPlatformMethod('update', response, token, cartId || null, cartItem);
  }

  public deleteCartItem (response, token, cartId, cartItem) {
    if (!cartItem) {
      return apiStatus(response, 'No cartItem element provided within the request body', 500);
    }

    this.callPlatformMethod('delete', response, token, cartId || null, cartItem);
  }

  public pullCart (response, token, cartId, body) {
    this.callPlatformMethod('pull', response, token, cartId || null, body);
  }

  public getTotals (response, token, cartId, body) {
    this.callPlatformMethod('totals', response, token, cartId || null, body);
  }

  public collectTotals (response, token, cartId, methods) {
    if (!methods) {
      return apiStatus(response, 'No shipping and payment methods element provided within the request body', 500);
    }

    this.callPlatformMethod('collectTotals', response, token, cartId || null, methods);
  }

  public applyCoupon (response, token, cartId, coupon) {
    if (!coupon) {
      return apiStatus(response, 'No coupon code provided', 500);
    }

    this.callPlatformMethod('applyCoupon', response, token, cartId || null, coupon);
  }

  public deleteCoupon (response, token, cartId) {
    this.callPlatformMethod('deleteCoupon', response, token, cartId || null);
  }

  public getCoupon (response, token, cartId) {
    this.callPlatformMethod('getCoupon', response, token, cartId || null);
  }

  public getShippingMethods (response, token, cartId, address) {
    if (!address) {
      return apiStatus(response, 'No address element provided within the request body', 500);
    }

    this.callPlatformMethod('getShippingMethods', response, token, cartId || null, address);
  }

  public setShippingInformation (response, token, cartId, body) {
    if (!body.addressInformation) {
      return apiStatus(response, 'No address element provided within the request body', 500);
    }

    this.callPlatformMethod('setShippingInformation', response, token, cartId || null, body);
  }

  public getPaymentMethods (response, token, cartId) {
    this.callPlatformMethod('getPaymentMethods', response, token, cartId || null);
  }
}
