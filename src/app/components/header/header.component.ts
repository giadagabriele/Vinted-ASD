import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {CartModelServer} from '../../models/cart.model';
import {CartService} from '../../services/cart.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  selected?: string;
  users: string [] = []
  products: string [] = []
  optEmpty(){
    this.users = []
    this.products = []
  }
  optUsers(){
   this.users = ['Giada','Mohamed','Antonio','Tesfay','Gebreyowhans','Beatrice']
  }
  optProducts(){
    this.products = ['prod1','prod2','prod3','prod4','prod5','prod6']
  }
  noResult = false;
  favNum: number;
  cartData: CartModelServer;
  cartTotal: number;
  authState: boolean;
  constructor(public cartService: CartService,
              public userService: UserService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.favoriteList();
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);

    this.cartService.cartData$.subscribe(data => this.cartData = data);

    this.userService.authState$.subscribe(authState => this.authState = authState);
  }

  logout(){
    this.userService.logout();
  }
  navigateToContact(){
    this.router.navigateByUrl('/contact')
  }
  favoriteList(){
    this.favNum = this.cartService.addFavoriteProduct(3);
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

}