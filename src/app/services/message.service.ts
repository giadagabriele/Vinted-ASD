import { MessageComponent } from '../components/message/message.component';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environment';
import {Observable} from 'rxjs';
import {ProductModelServer} from '../models/product.model';
export class Report {
  id: number;
  user: string;
  reason: string;
  repotedBy: string;
}
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  [x: string]: any;

  private SERVER_URL = environment.SERVER_URL;

  constructor(
    private httpClient: HttpClient
    ) { }

    getAll() {
      return this.httpClient.get<{ MessageComponent }[]>(this.SERVER_URL + '/message');
    }
  getMessage(id: number): Observable<any> {
    return this.httpClient.get<any>(this.SERVER_URL + '/message/' + id);
  }
  postMessage(message: any): Observable<string> {
    const headers = new HttpHeaders().set('responsType', 'text');
    return this.httpClient.post(`${this.SERVER_URL}/message`, message, {
      headers,
      responseType: 'text' as const,
    });
  }
  // tslint:disable-next-line:variable-name
  deleteMessage(_id: number): Observable <any > {
    console.log(' i am deleteing the message the fowlliwing', _id);
    return this.httpClient.delete<any>(`${this.SERVER_URL}/message/ ${_id}`);
  }

  clearCache() {
    throw new Error('Method not implemented.');
  }

  getAllReports(): Observable<Report[]> {
    return this.httpClient.get<Report[]>(this.SERVER_URL + '/report');
  }

  getReport(_id: string): Observable<Report> {
    return this.httpClient.get<Report>(`${this.SERVER_URL}/report/${_id}`);
}

getAllByUserId(_id: any): Observable<Report[]> {
  return this.httpClient.get<Report[]>(`${this.SERVER_URL}/getAllByUserId/`+_id);
}

addReport(newReport: Report): Observable<Report> {
  return this.httpClient.post<Report>(`${this.SERVER_URL}/report`, newReport, {
      headers: {
          'Content-Type': 'application/json'
      }
  });
}


}
