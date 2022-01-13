import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaypalComponent } from '../payment/paypal/paypal.component';
import { PaypalPaymentRequest } from '@app/models/payment/paypal/PaypalPaymentRequest';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  id:any;
  product: any
  paymentFormRequest: PaypalPaymentRequest;
  constructor(
    private productService: ProductService,
    private _Activatedroute:ActivatedRoute,
    private modalService: NgbModal) {
      this._Activatedroute.paramMap.subscribe(params => { 
        this.id = params.get('id'); 
    });
     }

  ngOnInit() {
    console.log(this.id)
    this.productService.getSingleProduct(this.id).subscribe(prod => {
      this.product = prod;
    });
  }

  openModal() {
    const modalRef = this.modalService.open(PaypalComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      });
      
      this.paymentFormRequest.price=this.product.product.price;

    let data = {
      prop1: 'Some Data',
      prop2: 'From Parent Component',
      prop3: 'This Can be anything'
    }
  
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

  
}
