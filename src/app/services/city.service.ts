import { City } from './../models/city.model';
import { PersonalizationData } from './../models/personalization.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from './../models/user.model';
import { UserService } from '@app/services/user.service';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '@app/models/product.model';
@Injectable({
    providedIn: 'root',
  })
export class CityService {

    private SERVER_URL = environment.SERVER_URL;
    private baseUrl = `${this.SERVER_URL}/personalization/`;
    constructor(
        private httpClient: HttpClient,  private router: Router,private userService:UserService) {
        
           
    }

    getAll(): Observable<City[]> {
        return this.httpClient.get<City[]>(`${this.SERVER_URL}city/all/`)
     }
 
 



}
