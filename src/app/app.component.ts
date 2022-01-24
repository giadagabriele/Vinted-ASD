import { User } from './models/user.model';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }
  navigateToCategory() {
    this.router.navigateByUrl('/category');
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

  navigateToContact() {
    this.router.navigateByUrl('/contact');
  }

  navigateToPersonalization() {
    this.router.navigateByUrl('/personalization');
  }
  navigateToProduct() {
    this.router.navigateByUrl('/product');
  }
  navigateToFavorite() {
    this.router.navigateByUrl('/favorite');
  }
  navigateToMessage() {
    this.router.navigateByUrl('/message');
  }
  
}
