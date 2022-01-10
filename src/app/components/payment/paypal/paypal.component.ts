import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaypalPaymentRequest } from '@app/models/payment/paypal/PaypalPaymentRequest';
import { PayPalPaymentResponse } from '@app/models/payment/paypal/PayPalPaymentResponse';
import { PaypalService } from '@app/services/payment/paypal.service';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {


  constructor(private paypalPaymentService: PaypalService, private fb: FormBuilder,
    private formBuilder: FormBuilder) { }
    paymentForm: FormGroup;

ngOnInit() {
  this.paymentForm = this.fb.group({
    price: [''],
    intent :['sale'],
    currency :['EUR'],
    method : ['paypal'],
    description:['we are paying'],
    cancelURL : [`http://localhost:4200/payment-cancel`],
    successURL : [`http://localhost:4200/paymentsuccess`],
    })
}

request: PaypalPaymentRequest;
// paymentForm =  this.formBuilder.group({
// price: ['',Validators.required],
// //description: ['', Validators.required]
// });

paymentWithPayPal(){

  console.log(this.paymentForm.value)
  this.paypalPaymentService.payWithPayPal(this.paymentForm.value)
    .subscribe((response: PayPalPaymentResponse)=>{
      console.log(response);
      if (response.status){
        console.log(response.url);
        //window.open(response.url,'_blank');
        location.replace(response.url);
      }
    });
}

get f() { return this.paymentForm.controls; }

}
