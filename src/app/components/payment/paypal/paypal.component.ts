import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  this.paymentForm=new FormGroup({

    'price':new FormControl(null,[Validators.required,Validators.min(0.1)]),
    'intent':new FormControl('Sale',[Validators.required]),
    'currency':new FormControl('EUR',[Validators.required,Validators.minLength(3)]),
    'method':new FormControl('Paypal',[Validators.required]),
    'description':new FormControl('I paid for my order',[Validators.required]),
    'cancelURL':new FormControl('http://localhost:4200/payment-cancel',[Validators.required]),
    'successURL':new FormControl('http://localhost:4200/paymentsuccess',[Validators.required]),
  })
}
request: PaypalPaymentRequest;
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
