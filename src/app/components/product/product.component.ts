import { Favorite, HeaderComponent } from './../header/header.component';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {map} from 'rxjs/operators';
import { FavoriteService } from '@app/services/favorite.service';
declare let $: any;
export class Product {
  constructor(
    public id: number,
    public name: string,
    public brand: string,
    public image: string,
    public catagory: string,
  ) { }
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  id: number;
  product: any;
  thumbImages: any[] = [];
  @ViewChild('quantity') quantityInput;
  countFavorite = 0;
  headerComponent: HeaderComponent;

  constructor(private productService: ProductService,
              private cartService: CartService,
              public favoriteService: FavoriteService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((param: ParamMap) => {
          // @ts-ignore
          return param.params.id;
        })
      )
      .subscribe(prodId => {
        this.id = prodId;
        if (this.id == null) {
          this.productService.getAllProduct().subscribe(prod => {
            (// tslint:disable-next-line:no-unused-expression
           response: any) => {
             console.log('the value is ', response);
             this.Product = response;
           };
          });
        } else {
        this.productService.getSingleProduct(this.id).subscribe(prod => {
          this.product = prod;

          if (prod.images !== null) {
            // this.thumbImages = prod.images.split(';');
          }

        });
      }
      });
  }

  ngAfterViewInit(): void {
// Product Main img Slick
    $('#product-main-img').slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-imgs',
    });

    // Product imgs Slick
    $('#product-imgs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: '#product-main-img',
      responsive: [{
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: true,
        }
      },
      ]
    });

    // Product img zoom
    // tslint:disable-next-line:prefer-const
    const zoomMainProduct = document.getElementById('product-main-img');
    if (zoomMainProduct) {
      $('#product-main-img .product-preview').zoom();
    }
  }

  Increase() {
    // tslint:disable-next-line:radix
    let value = parseInt(this.quantityInput.nativeElement.value);

    if (this.product.quantity >= 1) {
      value++;

      if (value > this.product.quantity) {
        value = this.product.quantity;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();

  }
  sendMessage() {
    this.router.navigate(['/message']);
  }
  Decrease() {
    // tslint:disable-next-line:radix
    let value = parseInt(this.quantityInput.nativeElement.value);

    if (this.product.quantity > 0) {
      value--;

      if (value <= 1) {
        value = 1;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  addToCart(id: number) {
    this.cartService.AddProductToCart(id, this.quantityInput.nativeElement.value);
  }
  // addFavorite(id: number) {
  //   data: Favorite;
  //   data.productId =id;
  //   this.onSave(data)
  // }

  onSave(id: number) {
    const userI = 15;
    const newFavorite: any = { productId: id, userId: userI };
    this.favoriteService.addFavorite(newFavorite)
        .subscribe(
            (data: Favorite) => {
                console.log('created: ', data);
            },
            (error: any) => console.log(error),
            () => this.headerComponent.favoriteList()
        );
}
}
