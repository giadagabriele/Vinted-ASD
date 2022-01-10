import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PayPalConfirmPaymentRequest } from '@app/models/payment/paypal/PayPalConfirmPaymentRequest';
import { PaypalPaymentRequest } from '@app/models/payment/paypal/PaypalPaymentRequest';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  host = environment.SERVER_URL;
  constructor(private httpClient: HttpClient) { }

  payWithPayPal(request: PaypalPaymentRequest){
    const headers = new HttpHeaders().set('responsType', 'text');
    // if we setup token
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer '+sessionStorage.getItem('token')
    // });
    return this.httpClient.post(this.host+'/pay',request,{headers});
    console.log(" I am here in confirmaation")
  }

  confirmPayment(request: PayPalConfirmPaymentRequest){
    const headers = new HttpHeaders().set('responsType', 'text');
    console.log(" I am here in confirmaation")
    return this.httpClient.get(this.host+'/pay/success?paymentId='+request.paymentId+'&PayerID='+request.payerId,{headers});
  }
}
