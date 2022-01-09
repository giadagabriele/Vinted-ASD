import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PaypalPaymentRequest } from '@app/models/payment/paypal/PaypalPaymentRequest';
import { PayPalPaymentResponse } from '@app/models/payment/paypal/PayPalPaymentResponse';
import { PaypalService } from '@app/services/payment/paypal.service';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {


  constructor(private paypalPaymentService: PaypalService,
    private formBuilder: FormBuilder) { }

ngOnInit() {
}

request: PaypalPaymentRequest;
paymentForm =  this.formBuilder.group({
price: ['',Validators.required],
description: ['', Validators.required]
});

paymentWithPayPal() {
  this.request = this.paymentForm.value;
  this.request.intent = 'Sale';
  this.request.currency = 'EUR';
  this.request.method = 'paypal';
  this.request.cancelURL = 'http://localhost:4200/payment-cancel';
  this.request.successURL = 'http://localhost:4200/payment-success';
  this.paypalPaymentService.payWithPayPal(this.request)
    .subscribe((response: PayPalPaymentResponse)=>{
      if (response.status){
        console.log(response.url);
        window.open(response.url,'_blank');
      }
    });
}

}
