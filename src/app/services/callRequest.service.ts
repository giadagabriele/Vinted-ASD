import { CallRequest } from './../models/callRequest.model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root',
  })
export class CallRequestService {

    private SERVER_URL = environment.SERVER_URL;
    private baseUrl = `${this.SERVER_URL}/call/`;
    constructor(
        private httpClient: HttpClient,  private router: Router,private userService:UserService) {
        
           
    }

    getAllResponsesByUserId(id): Observable<CallRequest[]> {
        return this.httpClient.get<CallRequest[]>(`${this.SERVER_URL}/call/allResponsesByUserId/`+id)
     }

     getAllRequestsByUserId(id): Observable<CallRequest[]> {
      return this.httpClient.get<CallRequest[]>(`${this.SERVER_URL}/call/allRequestsByUserId/`+id)
   }
      allNotificationsByUserId(id): Observable<CallRequest[]> {
      return this.httpClient.get<CallRequest[]>(`${this.SERVER_URL}/call/allNotificationsByUserId/`+id)
   }
     save( callReq:CallRequest): Observable<boolean> {
        return this.httpClient.post<boolean>(`${this.SERVER_URL}/call/save/`,callReq)
     }

     accept(call): Observable<boolean> {
        console.log(call)
        return this.httpClient.post<boolean>(`${this.SERVER_URL}/call/accept/`,call)
     }
     cancel(id): Observable<boolean> {
        return this.httpClient.get<boolean>(`${this.SERVER_URL}/call/cancel/`+id)
     }
    
 
 



}
