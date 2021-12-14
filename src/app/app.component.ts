import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  name = 'JOHN DOE';

  constructor(private router : Router){
  }

  navigateToClothes(){
    this.router.navigateByUrl('/clothes')
  }

  navigateToShoes(){
    this.router.navigateByUrl('/shoes')
  }

  navigateToAccessories(){
    this.router.navigateByUrl('/accessories')
  }

  navigateToCook(){
    this.router.navigateByUrl('/cook')
  }

  navigateToTechnology(){
    this.router.navigateByUrl('/technology')
  }

  navigateToBook(){
    this.router.navigateByUrl('/book')
  }

  navigateToContact(){
    this.router.navigateByUrl('/contact')
  }

  navigateToPersonalization(){
    this.router.navigateByUrl('/personalization')
  }
}
