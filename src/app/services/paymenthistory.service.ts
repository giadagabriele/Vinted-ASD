import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
// import { Product } from '@app/components/product/product.component';
import {Observable} from 'rxjs';
// import {ProductModelServer, ServerResponse} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class PaymenthistoryService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(
    private httpClient: HttpClient
    ) { }

  getAllPaymentHistory() {
    return this.httpClient.get<any>(this.SERVER_URL + '/paymenthistory');
  }

  // update(id: number, request: any) {
  //   return this.httpClient.post(`${this.SERVER_URL}/product/update/` + id, request);
  // }

  add(paymentHistory: any) {
    return this.httpClient.post(`${this.SERVER_URL}/paymenthistory/`, paymentHistory);

  }

  getPaymenthistoryByUser(userId: any): Observable<any>  {
    return this.httpClient.get<any>(this.SERVER_URL + '/paymenthistory/user/' + userId);
   }
  getPaymenthistoryByProduct(productId: string): Observable<any>  {
    return this.httpClient.get<any>(this.SERVER_URL + '/paymenthistory/' + productId);
   }

}
