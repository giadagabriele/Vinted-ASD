import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  id:any;
  product: any

  constructor(
    private productService: ProductService,
    private _Activatedroute:ActivatedRoute    ) {
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



}
