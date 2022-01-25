import { AuthenticationService } from '@app/services/authentication.service';
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
export class PersonalizationService {

    private SERVER_URL = environment.SERVER_URL;
    private baseUrl = `${this.SERVER_URL}/personalization/`;
    private myUser:User;
    constructor(
        private httpClient: HttpClient,  private router: Router,private authenticationService:AuthenticationService) {
        
            this.authenticationService.currentUser
            .subscribe((data: User) => {
              this.myUser = data;
            });
    }



    save(list){
        console.log("OKKSERVICE")
        this.httpClient.post(`${this.SERVER_URL}/personalization/save/`+this.myUser.id,list,
            ).subscribe(
            (data:any) => {
              console.log(data);    
            })  ;       


    }
    getAllByUserId(): Observable<PersonalizationData[]> {
       return this.httpClient.get<PersonalizationData[]>(`${this.SERVER_URL}/personalization/getByUserId/`+this.myUser.id)
    }




}