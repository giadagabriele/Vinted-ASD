import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { ProductModelServer } from '@app/models/product.model';
import { ProductService } from '@app/services/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-usersproducts',
  templateUrl: './usersproducts.component.html',
  styleUrls: ['./usersproducts.component.scss']
})
export class UsersproductsComponent implements OnInit {
  [x: string]: any;
  category: string;
  idUtente: any;
  product: Array<ProductModelServer> = new  Array<ProductModelServer>();
   constructor(
     private productService: ProductService,
     private router: Router,
     private route: ActivatedRoute
   ) {
      this.route.paramMap.subscribe(params => { 
      this.idUtente = params.get('id'); 
      console.log(this.idUtente)
      });
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
                this.productService.getAllProductsByOtherUserSeller(this.idUtente).subscribe(prod => {
                  this.product = prod;
                  console.log('we get the data', this.product);
                })
           
            
     }
     });
   }

   ngOnInit(): void {
     this.default();
   }


   

 selectProduct(id: number) {
   this.router.navigate(['/product', id]).then();
 }

}
