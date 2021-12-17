import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from 'environment';
import { Product } from '@app/components/product/product.component';
import {Observable} from 'rxjs';
import {ProductModelServer, ServerResponse} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(
    private httpClient: HttpClient
    ) { }

    getAllProduct() {
      return this.httpClient.get<{Product}[]>(this.SERVER_URL + '/product/product');
    }



  /* This is to fetch all products from the backend server */
  getAllProducts(numberOfResults= 10): Observable<ServerResponse> {
    return this.httpClient.get<ServerResponse>(this.SERVER_URL + '/product/product', {
      params: {
        limit: numberOfResults.toString()
      }
    });
  }

  /* GET SINGLE PRODUCT FROM SERVER*/
  getSingleProduct(id: number): Observable<ProductModelServer> {
    return this.httpClient.get<ProductModelServer>(this.SERVER_URL + '/product/product/' + id);
  }

  /*GET PRODUCTS FROM ONE CATEGORY */
  // getProductsFromCategory(catName: string): Observable<ProductModelServer[]>  {
  //   return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/product/brand/' + catName);
  //  }
}
