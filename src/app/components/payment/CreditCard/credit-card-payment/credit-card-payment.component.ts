import { PaymenthistoryService } from './../../../../services/paymenthistory.service';
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
  @Input() public obj;
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
              private paymenthistoryService: PaymenthistoryService,
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

      'price':new FormControl(this.obj.price,[Validators.required,Validators.min(0.1)]),
      'intent':new FormControl('Sale',[Validators.required]),
      'currency':new FormControl('EUR',[Validators.required,Validators.minLength(3)]),
      'method':new FormControl('Credit Card',[Validators.required]),
      'description':new FormControl('Payment for order',[Validators.required]),
      // 'cancelURL':new FormControl('http://localhost:4200/payment-cancel',[Validators.required]),
      'successURL':new FormControl('http://localhost:4200/paymentsuccess',[Validators.required]),
      'productID':new FormControl(this.obj.productId,[Validators.required,Validators.min(0.1)]),
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
          // this.addPaymentHistory(this.request);
          // this.showSuccessAlert(response);
          if (response.status === 'succeeded') {
            this.addPaymentHistory(this.request);
            this.showSuccessAlert(response);
            window.close();
            location.replace('http://localhost:4200')
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
    // tslint:disable-next-line:max-line-length
    this.toastr.success('Payment successfully completed. Details of the transaction: \nAmount: '+data.amount+'\nPayment ID: '+data.paymentID, "Card Payment")
  }
  // tslint:disable-next-line:variable-name
  addPaymentHistory(data: any) {
    // tslint:disable-next-line:max-line-length
    const paymentHistory: any = { product: this.request.productID, user: this.user.id, price: this.request.price, description: this.request.description, paymentMethod: 'Credit Card'};
    this.paymenthistoryService.add(paymentHistory)
          .subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            (data: any) => {
              console.log('payment history added', data);
              window.location.reload();
            },
            (error: any) => console.log(error),
            () => this.ngOnInit()
          );
  }


}
