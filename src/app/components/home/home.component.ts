import { Category } from '@app/models/product.model';
import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {ProductModelServer, ServerResponse} from '../../models/product.model';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  product: Array<ProductModelServer> = new  Array<ProductModelServer>();
  // product: any;
  category: any;
  constructor(private productService: ProductService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllCategories();

  }

getAllCategories() {
      // tslint:disable-next-line:prefer-const
      this.productService.getAllProduct().subscribe((data: []) =>  {

    this.product = data;
    const arr = [];
    let temp: any = {};
    const categoryList: any = [];

    temp = this.product.map(item => {
      if (!arr.includes(item.category)) {
        arr.push(item.category);
        categoryList.push({ category: item.category, image: item.image});
        } else {

        }
      });

    this.category = categoryList;

    },
    (error: any)   => console.log(error),
    () => {
        console.log('all data gets');
        console.log('iam from main', this.category);
    }
  );

}

navigate(category) {
  this.router.navigateByUrl('/' + category);

}
  selectProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }

  AddToCart(id: number) {
    this.cartService.AddProductToCart(id);
  }

}
