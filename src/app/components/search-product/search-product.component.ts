
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/services/product.service';
import { Product } from '../product/product.component';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  productsDb: Product[];
  searchText:string;
  constructor(private route: ActivatedRoute,private productService: ProductService) { }

  ngOnInit(): void {

    this.route.paramMap
    .pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.searchText;
      })
    ).subscribe(st => {
this.searchText=st;
  });

  this.productService.getAllProduct().subscribe((data: Product[]) =>  {
    this.productsDb = data;
  },
  (error: any)   => console.log(error),
  
);

}



}