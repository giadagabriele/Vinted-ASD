import { ModalComponent } from './../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CallRequestService } from './../../services/callRequest.service';
import { CallRequest } from './../../models/callRequest.model';
import { AuthenticationService } from './../../services/authentication.service';
import { User } from './../../models/user.model';
import {Component, NgZone, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {CartModelServer} from '../../models/cart.model';
import { FavoriteService } from '@app/services/favorite.service';
import {UserService} from '../../services/user.service';
import { ProductService } from '@app/services/product.service';
import { City } from '@app/models/city.model';
import { CityService } from '@app/services/city.service';

declare let $: any;
export class Favorite {
  constructor(
    public id: number,
    public userId: number,
    public productId: number,
    public image: string
   ) { }
}



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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  favorites: Favorite[];
  notifications: CallRequest[];

  favLength = 0;
  notifiLength = 0;

  displayOrNot = true;
  selected: string;
  users: string[] = [];
  list: string[] = [];
  cities: string[] = [];
  value=2;
  productsDb: Product[];
  products: string[] = [];
  noResult = false;
  cartData: CartModelServer;
  cartTotal: number;
  authState: boolean;
  usersDb: User[];
  citiesDb: City[];
 
  
  constructor(public favoriteService: FavoriteService,
              public userService: UserService,
              public productService: ProductService,private authenticationService: AuthenticationService,
              private cityService: CityService,
              private router: Router,private _ngZone: NgZone,private callRequestService:CallRequestService,private modalService:NgbModal
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }
  currentUser: User;

  ngOnInit(): void {
   
    // this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);

    // this.cartService.cartData$.subscribe(data => this.cartData = data);

    this.favoriteList();
    this.notificationList();
    this.optProducts();
  }
  toggleMessage(popover) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }

  favoriteList() {
      this.favoriteService.getAllFavorites().subscribe((data: Favorite[]) =>  {
        // start of (1)
          this.favorites = data;
          if (this.favorites.length > 0) {
            this.favLength = this.favorites.length;
            this.displayOrNot = false;
          } else {
            this.displayOrNot = true;
          }
        },
        (error: any)   => console.log(error),
        ()             => console.log('all data gets')
      );
    }

    deleteFavorite(id: number) {
      console.log('deleting the favorite list', id);
      const response = this.favoriteService.deleteFavorite(id)
      .subscribe(
        (res: any) => window.location.reload(),
        (error: any) => console.log(error),
        () => console.log('deleted')
      );
    }

  getSingleFavoriteProduct(id: number): void {
    this.favoriteService.getFavorite(id)
        .subscribe(
            (res: Favorite) => {
                console.log('data', res);
            },
            (error: any) => console.log(error),
            () => console.log('completed')
        );
}
notificationList() {

  this.callRequestService.allNotificationsByUserId(this.currentUser.id).subscribe((data: CallRequest[]) =>  {
    console.log(data)
    this.notifications = data;
     
        this.notifiLength = this.notifications.length;
        this.displayOrNot = false;
     
    },
    (error: any)   => console.log(error),
    ()             => console.log('all data gets')
  );
}

deleteNotification(cr:CallRequest) {
  cr.status=2;
  console.log(cr)
  this.callRequestService.save(cr).subscribe(resp=>{
   const modalRef = this.modalService.open(ModalComponent);
  if(resp){
    modalRef.componentInstance.name = "Request denied successfully";
  }
  else
   modalRef.componentInstance.name = "There was a problem, please try again later";
  

});
setTimeout(() => 
{
  this.notificationList()
},
200);
}
acceptNotification(cr:CallRequest){
  cr.status=1;
  console.log(cr)
  this.callRequestService.save(cr).subscribe(resp=>{
   const modalRef = this.modalService.open(ModalComponent);
  if(resp){
    modalRef.componentInstance.name = "Request accepted successfully";
  }
  else
   modalRef.componentInstance.name = "There was a problem, please try again later";
  

});

  
}

getSingleNotification(id: number): void {
this.favoriteService.getFavorite(id)
    .subscribe(
        (res: Favorite) => {
            console.log('data', res);
        },
        (error: any) => console.log(error),
        () => console.log('completed')
    );
}

logout() {
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}
  navigateToContact() {
    this.router.navigateByUrl('/contact');
  }

  optEmpty() {
    this.users.length = 0;
    this.products.length = 0;
    this.cities.length = 0;
  }

  optUsers() {
    this.optEmpty();
    this.userService.getAll().subscribe((data: User[]) =>  {
      this.usersDb = data;
      this.usersDb.forEach(element => {
        this.users.push(element.username);
      });
    },
    (error: any)   => console.log(error),
    ()             => this.list=this.users
  );
  }

  optPlace() {
    
    this.optEmpty();
    this.cityService.getAll().subscribe((data: City[]) =>  {
      
      this.citiesDb = data;
      this.citiesDb.forEach(element => {
        this.cities.push(element.name);
      });
    },
    (error: any)   => console.log(error),
    ()             => this.list=this.cities
  );
  }

  optProducts() {
    this.optEmpty();
    this.productService.getAllProduct().subscribe((data: Product[]) =>  {
        this.productsDb = data;
        this.productsDb.forEach(element => {
          this.products.push(element.name);
        })
      },
      (error: any)   => console.log(error),
      ()             => this.list=this.products
    );
  }
 
  opt(val){
    

    if(val==1)
      this.optUsers();
      if(val==2)
      this.optProducts();
    if(val==3)
      this.optPlace();
    this.value=val;  
  }

  searchProducts(){
    this.productsDb.forEach(element => {
      if(element.name=== this.selected)
      this._ngZone.run(()=>{
      this.router.navigate(['/product', element.id])});
    });
  }

  searchUser(){
    this.usersDb.forEach(element => {
      if(element.username=== this.selected)
      this._ngZone.run(()=>{
     this.router.navigateByUrl('/user/'+element.username)});
    });
  }

  result(){
    console.log(this.selected)
    if(this.value==1)
      this.searchUser();
    if(this.value==2)
      this.searchProducts();
    if(this.value==3)
      this.search();
  }


  typeaheadNoResults(event: boolean): void {
    console.log(event)
    this.noResult = event;
    console.log(this.selected)
  }

  createProduct() {
    this.router.navigateByUrl('/create-product',)
  }

  search(){
    if(this.value==1)
      this.router.navigate(['/searchUser', this.selected]);
    if(this.value==2)
      this.router.navigate(['/searchProduct', this.selected]);
    if(this.value==3)
      this.router.navigate(['/searchUser', this.selected]);
  }

   

}
