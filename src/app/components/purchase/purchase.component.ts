import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaypalComponent } from '../payment/paypal/paypal.component';
import { GenericPaymentRequest } from '@app/models/payment/paypal/GenericPaymentRequest';
import { CreditCardPaymentComponent } from '../payment/CreditCard/credit-card-payment/credit-card-payment.component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  id: any;
  product: any;
  price: any;
  paymentFormRequest: GenericPaymentRequest;
  constructor(
    private productService: ProductService,
    private _Activatedroute: ActivatedRoute,
    private modalService: NgbModal) {
      this._Activatedroute.paramMap.subscribe(params => {
        this.id = params.get('id');
    });
     }

  ngOnInit() {
    console.log(this.id);
    this.productService.getSingleProduct(this.id).subscribe(prod => {
      this.product = prod;
    });
  }

  openPaypalModal() {
    const modalRef = this.modalService.open(PaypalComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      });
    modalRef.componentInstance.price = {price: this.product.price};
    this.paymentFormRequest.price = this.product.price;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

  openCreditCardModal() {
    const modalRef = this.modalService.open(CreditCardPaymentComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      });
    modalRef.componentInstance.price = {price: this.product.price};
    this.paymentFormRequest.price = this.product.price;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

}
