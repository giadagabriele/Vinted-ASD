import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from './../models/user.model';
import { UserService } from '@app/services/user.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '@app/models/product.model';

@Injectable({
    providedIn: 'root',
  })
export class CategoryService {

    private SERVER_URL = environment.SERVER_URL;
    private baseUrlUpdateProfile = `${this.SERVER_URL}/user/`;
    private myUser:User;
    constructor(
        private httpClient: HttpClient,  private router: Router,private userService:UserService) {
        
            this.userService.userData$
            .subscribe((data: User) => {
              this.myUser = data;
            });
    }

    
    getAllCategories(): Observable<Category[]> {
 
        return this.httpClient.get<Category[]>(`${this.SERVER_URL}category/getAll`);
    
    }


}