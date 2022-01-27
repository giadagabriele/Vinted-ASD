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

    getAllByUserId(id): Observable<CallRequest[]> {
        return this.httpClient.get<CallRequest[]>(`${this.SERVER_URL}/call/allRequestsByUserId/`+id)
     }
     
     save( callReq:CallRequest): Observable<boolean> {
        return this.httpClient.post<boolean>(`${this.SERVER_URL}/call/save/`,callReq)
     }

 
 



}
