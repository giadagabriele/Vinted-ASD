import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private SERVER_URL = environment.SERVER_URL;
    loginMessage$ = new BehaviorSubject<string>(null);

    constructor(private router:Router,private http: HttpClient,private authService: AuthService,private userService:UserService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
       const user = new User;
        user.email = email;
        user.password = password;
       return this.http
      .post<any>(`${this.SERVER_URL}/user/login`, user)
            .pipe(map(userIn => {
                // login successful if there's a jwt token in the response
                if (userIn) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(userIn));
                    this.currentUserSubject.next(userIn);
                }
                else{
                    this.loginMessage$.next(
                        'Incorrect email address or password, please try again'
                      );
                }
                return userIn;
            }));
    }
    googleLogin()  {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        
        this.authService.authState.subscribe((userSocial: SocialUser) => {
          console.log(userSocial);
         
          if (userSocial != null) {
            userSocial.id = '0';
    
            this.http.post(`${this.SERVER_URL}/user/loginGoogle`, userSocial).subscribe((res: User) => {
            //  No user exists in database with Social Login
            console.log(res);

           if (res === null) {
         //     Send data to backend to register the user in database
              const userConv = this.userService.fromSocialUserToUser(userSocial);
              this.userService.registraUser(
                 userConv
               ).subscribe(msg=>{
                if (msg === "Congratulations, your account has been successfully created.")
                  this.googleLogin();
               });
            
    
              } else {
                localStorage.setItem('currentUser', JSON.stringify(res));
                sessionStorage.setItem('id',res.id.toString())
                this.currentUserSubject.next(res);
                this.router.navigate(['/']);

              }
            });
    
          }
        });
      }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.authService.signOut();
    }

    public get loggedInUser(): User {
      return this.currentUserSubject.value;
    }
}