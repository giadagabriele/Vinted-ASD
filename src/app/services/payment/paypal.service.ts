import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PayPalConfirmPaymentRequest } from '@app/models/payment/paypal/PayPalConfirmPaymentRequest';
import { PaypalPaymentRequest } from '@app/models/payment/paypal/PaypalPaymentRequest';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  host = environment.SERVER_URL+'/pay';
  constructor(private httpClient: HttpClient) { }

  payWithPayPal(request: PaypalPaymentRequest){
    const headers = new HttpHeaders().set('responsType', 'text');
    // if we setup token
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer '+sessionStorage.getItem('token')
    // });
    
    return this.httpClient.post(this.host+'/pay',request,{headers});
  }

  confirmPayment(request: PayPalConfirmPaymentRequest){
    const headers = new HttpHeaders().set('responsType', 'text');
    return this.httpClient.post(this.host+'/successPay', request, {
      headers,
      responseType: 'text' as const,
    });
    //  return this.httpClient.post(this.host+'/success',request,{headers}); if we set token
  }
}
