import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PurchaseComponent } from '@app/components/purchase/purchase.component';
import { PaypalPaymentRequest } from '@app/models/payment/paypal/PaypalPaymentRequest';
import { PayPalPaymentResponse } from '@app/models/payment/paypal/PayPalPaymentResponse';
import { PaypalService } from '@app/services/payment/paypal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  @Input() fromParent;
  constructor(private paypalPaymentService: PaypalService,private formBuilder: FormBuilder,public activeModal: NgbActiveModal) { }
    paymentForm: FormGroup;
    
    request: PaypalPaymentRequest;

ngOnInit() {

 // this.request.price=this.product.product.price;
 
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

paymentWithPayPal(){
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

closeModal(sendData) {
  this.activeModal.close(sendData);
}

}


