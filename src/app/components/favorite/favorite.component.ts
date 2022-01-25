import { Product } from './../product/product.component';
import { FavoriteService } from './../../services/favorite.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})

export class FavoriteComponent implements OnInit {
  favorites: Favorite[];
 displayOrNot = true;
  constructor( private favoriteService: FavoriteService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.favoriteList();
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

  onSave(formData: Favorite) {
      const newFavorite: any = { prdoductId: formData.productId, userId: formData.userId };
      this.favoriteService.addFavorite(newFavorite)
          .subscribe(
              (data: Favorite) => {
                  console.log('created: ', data);
              },
              (error: any) => console.log(error),
              () => console.log('completed')
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

navigateToProduct() {
  this.router.navigateByUrl('/product');
}

}
