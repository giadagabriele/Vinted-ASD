import { MessageComponent } from './../message/message.component';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environment';
import {Observable} from 'rxjs';
import {ProductModelServer} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(
    private httpClient: HttpClient
    ) { }

    getAll() {
      return this.httpClient.get<{ MessageComponent }[]>(this.SERVER_URL + '/message/message');
    }
  getMessage(id: number): Observable<ProductModelServer> {
    return this.httpClient.get<ProductModelServer>(this.SERVER_URL + '/product/' + id);
  }
  postMessage(message: any): Observable<string> {
    const headers = new HttpHeaders().set('responsType', 'text');
    return this.httpClient.post(`${this.SERVER_URL}/message/message`, message, {
      headers,
      responseType: 'text' as const,
    });
  }

  clearCache() {
    throw new Error('Method not implemented.');
  }
}
