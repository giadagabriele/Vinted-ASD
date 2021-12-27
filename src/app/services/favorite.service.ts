import { Favorite } from './../components/favorite/favorite.component';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environment';
import {Observable} from 'rxjs';
import {ProductModelServer, ServerResponse} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  [x: string]: any;

  private SERVER_URL = environment.SERVER_URL;

  constructor(
    private httpClient: HttpClient) { }

    getAllFavorites(): Observable<Favorite[]> {
      console.log('getting all the favorites from the server');
      return this.httpClient.get<Favorite[]>(this.SERVER_URL + '/favorite');
    }

    // tslint:disable-next-line:variable-name
    getFavorite(_id: number): Observable<Favorite> {
      return this.httpClient.get<Favorite>(`${this.SERVER_URL}/favorite/${_id}`);
  }

  /* GET SINGLE PRODUCT FROM SERVER*/
  getSingleProduct(id: number): Observable<ProductModelServer> {
    return this.httpClient.get<ProductModelServer>(this.SERVER_URL + '/product/' + id);
  }

  addFavorite(newFavorite: Favorite): Observable<Favorite> {
    return this.httpClient.post<Favorite>(`${this.SERVER_URL}/favorite`, newFavorite, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
// tslint:disable-next-line:variable-name
deleteFavorite(_id: number): Observable < Favorite > {
  console.log(' i am deleteing the favorite number of the fowlliwing', _id);
  return this.httpClient.delete<Favorite>(`${this.SERVER_URL}/favorite/ ${_id}`);
}

  /*GET PRODUCTS FROM ONE CATEGORY */
  // getProductsFromCategory(catName: string): Observable<ProductModelServer[]>  {
  //   return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/product/brand/' + catName);
  //  }
}


