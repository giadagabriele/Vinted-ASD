import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { map } from 'rxjs/operators';
import {ProductService} from '../../services/product.service';
import { ProductModelServer } from '@app/models/product.model';
@Component({
    selector: 'app-clothes',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})

export class CategoryComponent implements OnInit {
  [x: string]: any;
   category: string;
   product: Array<ProductModelServer> = new  Array<ProductModelServer>();
    constructor(
      private productService: ProductService,
      private router: Router,
      private route: ActivatedRoute
    ) {}

    opt(val){
      if(val==0)
        this.default();
      if(val==1)
        this.sortByAscendingPrice();
      if(val==2)
        this.sortByDescendingPrice();
    }
    
    default(){
      this.route.url
      .pipe(
        // tslint:disable-next-line:variable-name
        map((_param: UrlSegment[]) => {
          return _param[0].path;
        })
      )

      // tslint:disable-next-line:variable-name
      .subscribe(_prodId => {
        this.category = _prodId;
        console.log(this.category);
        if (this.category == null) {
          // tslint:disable-next-line:variable-name
          this.productService.getAllProduct().subscribe(_prod => {
            (// tslint:disable-next-line:no-unused-expression
           response: any) => {
             console.log('the value is ', response);
             this.Product = response;
           };
          });
        } else {
             console.log('we get before the data', this.product);
              this.productService.getProductByCategory(this.category).subscribe(prod => {
              this.product = prod;
              console.log('we get the data', this.product);
            });
      }
      });
    }

    ngOnInit(): void {
      this.default();
    }

    sortByAscendingPrice(){
      this.route.url
      .pipe(
        // tslint:disable-next-line:variable-name
        map((_param: UrlSegment[]) => {
          return _param[0].path;
        })
      )

      // tslint:disable-next-line:variable-name
      .subscribe(_prodId => {
        this.category = _prodId;
        console.log(this.category);
        if (this.category == null) {
          // tslint:disable-next-line:variable-name
          this.productService.getAllProduct().subscribe(_prod => {
            (// tslint:disable-next-line:no-unused-expression
           response: any) => {
             console.log('the value is ', response);
             this.Product = response;
           };
          });
        } else {
             console.log('we get before the data', this.product);
              this.productService.getProductByCategorySortedByAscendingPrice(this.category).subscribe(prod => {
              this.product = prod;
              console.log('we get the data', this.product);
            });
      }
      });
    }

    sortByDescendingPrice(){
      this.route.url
      .pipe(
        // tslint:disable-next-line:variable-name
        map((_param: UrlSegment[]) => {
          return _param[0].path;
        })
      )

      // tslint:disable-next-line:variable-name
      .subscribe(_prodId => {
        this.category = _prodId;
        console.log(this.category);
        if (this.category == null) {
          // tslint:disable-next-line:variable-name
          this.productService.getAllProduct().subscribe(_prod => {
            (// tslint:disable-next-line:no-unused-expression
           response: any) => {
             console.log('the value is ', response);
             this.Product = response;
           };
          });
        } else {
             console.log('we get before the data', this.product);
              this.productService.getProductByCategorySortedByDescendingPrice(this.category).subscribe(prod => {
              this.product = prod;
              console.log('we get the data', this.product);
            });
      }
      });
    }

  selectProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }
  navigateToClothes() {
    this.router.navigateByUrl('/clothes');
  }

  navigateToShoes() {
    this.router.navigateByUrl('/shoes');
  }

  navigateToAccessories() {
    this.router.navigateByUrl('/accessories');
  }

  navigateToCook() {
    this.router.navigateByUrl('/cook');
  }

  navigateToTechnology() {
    this.router.navigateByUrl('/technology');
  }

  navigateToBook() {
    this.router.navigateByUrl('/book');
  }

}
