import { Component, OnInit } from '@angular/core';
import { PayPalConfirmPaymentRequest } from '@app/models/payment/paypal/PayPalConfirmPaymentRequest';
import { PayPalConfirmPaymentResponse } from '@app/models/payment/paypal/payPalConfirmPaymentResponse';
import { PaypalService } from '@app/services/payment/paypal.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(private paymentService: PaypalService) { }

  request: PayPalConfirmPaymentRequest = new PayPalConfirmPaymentRequest();

  ngOnInit() {

    if (document.URL.indexOf('?')){
      const splitUrl = document.URL.split('?');
      const splitParams = splitUrl[1].split('&');
      let i: any;
      for (i in splitParams){
        const singleURLParam = splitParams[i].split('=');
        if (singleURLParam[0]==='paymentId'){
          this.request.paymentId = singleURLParam[1].trim();
        }
        if (singleURLParam[0]==='PayerID'){
          this.request.payerId = singleURLParam[1].trim();
        }
      }
    }

    console.log( this.request);

    // call to successPayment service
    this.paymentService.confirmPayment(this.request)
      .subscribe((response: PayPalConfirmPaymentResponse)=>{
        console.log(response.status);
        if (response.status==='approved'){
          console.log(response);
          window.close();
          // location.replace('http://localhost:4200')

        }
    });

  }
  
}
