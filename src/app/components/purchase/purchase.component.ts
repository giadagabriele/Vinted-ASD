import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/services/product.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  product: any

  constructor(
    private productService: ProductService
    ) { }

  ngOnInit() {
    this.productService.getSingleProduct(1).subscribe(prod => {
      this.product = prod;
    });
  }



}
