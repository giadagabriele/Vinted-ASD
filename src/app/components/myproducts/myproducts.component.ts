import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { ProductModelServer } from '@app/models/product.model';
import { User } from '@app/models/user.model';
import { AuthenticationService } from '@app/services/authentication.service';
import { ProductService } from '@app/services/product.service';
import { element } from 'protractor';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.scss']
})
export class MyproductsComponent implements OnInit {
  [x: string]: any;
  category: string;
  idUtente: number;
  show: boolean ;
  product: Array<ProductModelServer> = new  Array<ProductModelServer>();
   constructor(
     private productService: ProductService,
     private router: Router,
     private route: ActivatedRoute,
     private authenticationService:AuthenticationService
   ) {
    this.authenticationService.currentUser
    .subscribe((data: User) => {
      this.idUtente = data.id;
    });
   }

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
                this.productService.getAllProductsBySeller(this.idUtente).subscribe(prod => {
                  this.product = prod;
                  console.log('we get the data', this.product);
                });
           
            
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
