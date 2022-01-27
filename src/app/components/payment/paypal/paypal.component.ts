import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PurchaseComponent } from '@app/components/purchase/purchase.component';
import { GenericPaymentRequest } from '@app/models/payment/paypal/GenericPaymentRequest';
import { PayPalPaymentResponse } from '@app/models/payment/paypal/PayPalPaymentResponse';
import { PaymentService } from '@app/services/payment/payment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  @Input() fromParent;
  @Input() public obj;
  // @Input() public id;
  constructor(private paypalPaymentService: PaymentService,private formBuilder: FormBuilder,public activeModal: NgbActiveModal) { }
    paymentForm: FormGroup;
    request: GenericPaymentRequest;

ngOnInit() {
  this.paymentForm=new FormGroup({

    'price':new FormControl(this.obj.price,[Validators.required,Validators.min(0.1)]),
    'intent':new FormControl('Sale',[Validators.required]),
    'currency':new FormControl('EUR',[Validators.required,Validators.minLength(3)]),
    'method':new FormControl('Paypal',[Validators.required]),
    'description':new FormControl('I paid for my order',[Validators.required]),
    'cancelURL':new FormControl('http://localhost:4200/payment-cancel',[Validators.required]),
    'successURL':new FormControl('http://localhost:4200/paymentsuccess',[Validators.required]),
    'productID':new FormControl(this.obj.productId,[Validators.required,Validators.min(0.1)]),
    
  })
}

paymentWithPayPal(){

  localStorage.setItem('productId',this.obj.productId);

  this.paypalPaymentService.payWithPayPal(this.paymentForm.value)
    .subscribe((response: PayPalPaymentResponse)=>{
      if (response.status){
        location.replace(response.url);
      }
    });
}


get f() { return this.paymentForm.controls; }

closeModal(sendData) {
  this.activeModal.close(sendData);
}

}


