import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericPaymentRequest } from '@app/models/payment/paypal/GenericPaymentRequest';
import { User } from '@app/models/user.model';
import { AuthenticationService } from '@app/services/authentication.service';
import { PaymentService } from '@app/services/payment/payment.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environment';


interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-credit-card-payment',
  templateUrl: './credit-card-payment.component.html',
  styleUrls: ['./credit-card-payment.component.scss']
})
export class CreditCardPaymentComponent implements OnInit {
  @Input() public price;
  stripApiKey = environment.StripApi_Key;

  amount: number;
  paymentHandler: any = null;
  public user:User;
  request: GenericPaymentRequest =new GenericPaymentRequest();

  constructor(private paymentService: PaymentService,
              private formBuilder: FormBuilder,
              public activeModal: NgbActiveModal,
              private toastr: ToastrService,
              private route: Router,
              private authService:AuthenticationService) {
                this.user=authService.currentUserValue;
               }

  paymentForm =  this.formBuilder.group({
    price: ['',[Validators.required,Validators.nullValidator]],
    description: ['', [Validators.required,Validators.nullValidator]]
  });


  ngOnInit() {
    this.initStrip();
    this.paymentForm=new FormGroup({

      'price':new FormControl(this.price.price,[Validators.required,Validators.min(0.1)]),
      'intent':new FormControl('Sale',[Validators.required]),
      'currency':new FormControl('EUR',[Validators.required,Validators.minLength(3)]),
      'method':new FormControl('Credit Card',[Validators.required]),
      'description':new FormControl('Payment for order',[Validators.required]),
      // 'cancelURL':new FormControl('http://localhost:4200/payment-cancel',[Validators.required]),
      'successURL':new FormControl('http://localhost:4200/paymentsuccess',[Validators.required]),
      'productID':new FormControl("2",[Validators.required,Validators.min(0.1)]),
    })
  }

  private initStrip() {
    if(!window.document.getElementById('stripe-script')) {
      const s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(s);
    }
  }

  public payWithCreditCard() {
    const handler = (<any>window).StripeCheckout.configure({
      key:this.stripApiKey,
      locale: 'auto',
      token: function(token: any) {
        console.log(token);
        checkoutPayment(token);
      }
    });
    const checkoutPayment=(token: any)=>{
      console.log('request for checkout');
      this.request.description = this.paymentForm.value.description;
      this.request.price = this.paymentForm.value.price;
      this.request.stripeToken = token.id;
      this.request.stripeEmail = token.email;
      this.request.productID =this.paymentForm.value.productID;
      this.request.userID =this.user.id;
     

      this.paymentService.creditCardPayment(this.request)
        .subscribe((response: any) => {
          if (response.status==='succeeded'){
            this.showSuccessAlert(response);
          }
        });

    };
    handler.open({
      name: 'Vinted',
      description: this.paymentForm.value.description,
      amount: this.amount * 100
    });
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  async showSuccessAlert(data: any){
    this.toastr.success('Payment successfully completed. Details of the transaction: \nAmount: '+data.amount+'\nPayment ID: '+data.paymentID, "Card Payment")
  }

}
