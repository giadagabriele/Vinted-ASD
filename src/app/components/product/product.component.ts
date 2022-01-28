import { AuthenticationService } from './../../services/authentication.service';
import { MessageComponent } from './../message/message.component';
import { Favorite, HeaderComponent } from './../header/header.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { UserService } from '@app/services/user.service';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from './../../models/user.model';
import { FavoriteService } from '@app/services/favorite.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymenthistoryService } from '@app/services/paymenthistory.service';

declare let $: any;
export class Product {
  constructor(
    public id: number,
    public size: string,
    public description: string,
    public price: string,
    public userId: number,
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
  idForCheckingBuy: any;
  thumbImages: any[] = [];
  flag=false;
  @ViewChild('quantity') quantityInput;
  countFavorite = 0;
  headerComponent: HeaderComponent;
  isFavorite = false;
  user: User;
  header: {};
  constructor(private productService: ProductService,
              private cartService: CartService,
              public favoriteService: FavoriteService,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private authenticationService: AuthenticationService,
              private paymenthistoryService: PaymenthistoryService) {
    this.authenticationService.currentUser
      .subscribe((data: User) => {
        this.idForCheckingBuy = data.id;
        this.myUser = data;
      });

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
            // tslint:disable-next-line:no-unused-expression
            (
              response: any) => {
              console.log('the value is ', response);
              this.Product = response;
            };
          });
        } else {
          this.paymenthistoryService.getPaymenthistoryByProduct(this.id.toString()).subscribe(data => {
            if (data.length>0){
              this.flag = true;
            }
            console.log(data);
            //console.log('i get the proudct is sold', prod.length);
          });
        }
      });


    this.productService.getSingleProduct(this.id).subscribe(prod => {
        this.product = prod;
        this.favoriteList(this.id);
        if (prod.images !== null) {
          // this.thumbImages = prod.images.split(';');
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
  favoriteList(id) {
    let favorites = [];
    this.favoriteService.getAllFavorites().subscribe((data: Favorite[]) => {
      // start of (1)
      favorites = data;
      if (favorites.length > 0) {
        favorites.forEach(item => {
          console.log(item.productId.toString() === id);
          if (item.productId.toString() === id) {
            this.isFavorite = true;
            return;
          }
        });
        // console.log(favorites[0].productId);
        this.displayOrNot = false;
      } else {
        this.displayOrNot = true;
      }
    },
      (error: any) => console.log(error),
      () => console.log('all data gets')
    );
  }
  onSave(id: number) {
    if (this.isFavorite) {
      console.log('already favorite');
      return;
    } else {
      const newFavorite: any = { productId: id, userId: this.myUser.id, image: this.product.image };
      this.favoriteService.addFavorite(newFavorite)
        .subscribe(
          (data: Favorite) => {
            console.log('created: ', data);
            this.isFavorite = true;
            window.location.reload();
          },
          (error: any) => console.log(error),
          () => this.ngOnInit()
        );
    }
  }

  openMessageModal() {
    const modalRef = this.modalService.open(MessageComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      });
    modalRef.componentInstance.productUser = { user: this.product.userId };
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('test');
    });
  }

}
