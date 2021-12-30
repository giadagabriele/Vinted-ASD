import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {CartModelServer} from '../../models/cart.model';
import { FavoriteService } from '@app/services/favorite.service';
import {UserService} from '../../services/user.service';

declare let $: any;
export class Favorite {
  constructor(
    public id: number,
    public userId: number,
    public productId: number,
    public image: string
   ) { }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  favorites: Favorite[];
  favLength = 0;
  displayOrNot = true;
  selected?: string;
  users: string [] = [];
  products: string [] = [];
  noResult = false;
  cartData: CartModelServer;
  cartTotal: number;
  authState: boolean;
  optEmpty() {
    this.users = [];
    this.products = [];
  }
  optUsers() {
   this.users = ['Giada', 'Mohamed', 'Antonio', 'Tesfay', 'Gebreyowhans', 'Beatrice'];
  }
  optProducts() {
    this.products = ['prod1', 'prod2', 'prod3', 'prod4', 'prod5', 'prod6'];
  }
  constructor(public favoriteService: FavoriteService,
              public userService: UserService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.favoriteList();
    // this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);

    // this.cartService.cartData$.subscribe(data => this.cartData = data);

    this.userService.authState$.subscribe(authState => this.authState = authState);
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
        (res: any) => this.favoriteList(),
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


  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
  navigateToContact() {
    this.router.navigateByUrl('/contact');
  }
  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

}
