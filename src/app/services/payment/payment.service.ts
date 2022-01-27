import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StripePaymentRequest } from '@app/models/payment/CreditCard/StripePaymentRequest';
import { PayPalConfirmPaymentRequest } from '@app/models/payment/paypal/PayPalConfirmPaymentRequest';
import { GenericPaymentRequest } from '@app/models/payment/paypal/GenericPaymentRequest';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  host = environment.SERVER_URL;
  constructor(private httpClient: HttpClient) { }

  payWithPayPal(request: GenericPaymentRequest){
    const headers = new HttpHeaders().set('responsType', 'text');
    
    return this.httpClient.post(this.host+'/pay',request,{headers});
  }

  confirmPayment(request: PayPalConfirmPaymentRequest){
    const headers = new HttpHeaders().set('responsType', 'text');
    
    return this.httpClient.get(this.host+'/pay/success?paymentId='+
    request.paymentId+'&PayerID='+request.payerId+'&UserID='+request.userID+'&ProductID='+request.productId,{headers});
    
  }

  creditCardPayment(request: GenericPaymentRequest){
    const headers = new HttpHeaders().set('responsType', 'text');
    return this.httpClient.post(this.host+'/CreditCard',request,{headers});
  }
}
