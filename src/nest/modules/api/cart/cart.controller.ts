import { Controller, Get, Post, Body, Query, Res, Header } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor (private readonly cartService: CartService) { }

  @Post('create')
  public createCart (@Res() response, @Query('token') token) {
    this.cartService.createCart(response, token);
  }

  @Post('update')
  public updateCartItem (@Res() response, @Query('token') token, @Query('cartId') cartId, @Body('cartItem') cartItem) {
    this.cartService.updateCartItem(response, token, cartId, cartItem);
  }

  @Post('delete')
  public deleteCartItem (@Res() response, @Query('token') token, @Query('cartId') cartId, @Body('cartItem') cartItem) {
    this.cartService.deleteCartItem(response, token, cartId, cartItem);
  }

  @Get('pull')
  @Header('Cache-Control', 'no-cache, no-store')
  public pullCart (@Res() response, @Query('token') token, @Query('cartId') cartId, @Body() body) {
    this.cartService.pullCart(response, token, cartId, body);
  }

  @Get('totals')
  @Header('Cache-Control', 'no-cache, no-store')
  public getTotals (@Res() response, @Query('token') token, @Query('cartId') cartId, @Body() body) {
    this.cartService.getTotals(response, token, cartId, body);
  }

  @Post('collect-totals')
  @Header('Cache-Control', 'no-cache, no-store')
  public collectTotals (@Res() response, @Query('token') token, @Query('cartId') cartId, @Body('methods') methods) {
    this.cartService.collectTotals(response, token, cartId, methods);
  }

  @Post('apply-coupon')
  public applyCoupon (@Res() response, @Query('token') token, @Query('cartId') cartId, @Query('coupon') coupon) {
    this.cartService.applyCoupon(response, token, cartId, coupon);
  }

  @Post('delete-coupon')
  public deleteCoupon (@Res() response, @Query('token') token, @Query('cartId') cartId) {
    this.cartService.deleteCoupon(response, token, cartId);
  }

  @Get('coupon')
  public getCoupon (@Res() response, @Query('token') token, @Query('cartId') cartId) {
    this.cartService.getCoupon(response, token, cartId);
  }

  @Post('shipping-methods')
  @Header('Cache-Control', 'no-cache, no-store')
  public getShippingMethods (@Res() response, @Query('token') token, @Query('cartId') cartId, @Body('address') address) {
    this.cartService.getShippingMethods(response, token, cartId, address);
  }

  @Post('shipping-information')
  @Header('Cache-Control', 'no-cache, no-store')
  public setShippingInformation (@Res() response, @Query('token') token, @Query('cartId') cartId, @Body() body) {
    this.cartService.setShippingInformation(response, token, cartId, body);
  }

  @Get('payment-methods')
  @Header('Cache-Control', 'no-cache, no-store')
  public getPaymentMethods (@Res() response, @Query('token') token, @Query('cartId') cartId) {
    this.cartService.getPaymentMethods(response, token, cartId);
  }
}
