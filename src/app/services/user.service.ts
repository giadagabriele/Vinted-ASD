
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { environment } from './../../environment';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  auth = false;
  firstLogin = false;
  private SERVER_URL = environment.SERVER_URL;
  private baseUrlUpdateProfile = `${this.SERVER_URL}/user/`;
  // tslint:disable-next-line:new-parens
  private user = new User;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<SocialUser  | ResponseModel | object>(null);
  loginMessage$ = new BehaviorSubject<string>(null);
  userRole: number;
  registerMessage: any;
  private UserName = new BehaviorSubject<string>('null');
  private Email = new BehaviorSubject<string>(null);
  // private UserRole = new BehaviorSubject<string>(this.cookieService.get('userRole'));

  private userProfile: Observable<any>;
  private activityDetails$: Observable<any>;

  constructor(private authService: AuthService,
              private httpClient: HttpClient,  private router: Router) {

    authService.authState.subscribe((userSocial: SocialUser) => {
      console.log(userSocial);

      if (userSocial != null) {
        // userSocial.id = 0;

        this.httpClient.post(`${this.SERVER_URL}/user/loginGoogle`, userSocial).subscribe((res: User) => {
       console.log(res.firstLogin);
        //  No user exists in database with Social Login
       if (res === null) {
            // Send data to backend to register the user in database so that the user can place orders against his user id
          const userConv = this.fromSocialUserToUser(userSocial);
          this.registraUser(
              userConv
            ).subscribe(response => {
              if (response === 'Congratulations, your account has been successfully created.') {
                this.auth = true;
                this.firstLogin = userConv.firstLogin;

                this.authState$.next(this.auth);
                this.userData$.next(userConv);
              }
            });

          } else {
            this.auth = true;
            this.firstLogin = res.firstLogin;

            // @ts-ignore
            this.authState$.next(this.auth);
            this.userData$.next(res);
          }
        });

      }
    });
  }

  //  Login User with Email and Password
  fromSocialUserToUser(userSocial): User {
    console.log(userSocial);
    // tslint:disable-next-line:new-parens
    const userConverted = new User;
    userConverted.id = userSocial.id;
    userConverted.firstName = userSocial.firstName;
    userConverted.lastName = userSocial.lastName;
    userConverted.username = userSocial.name;
    userConverted.email = userSocial.email;
    userConverted.profilePic = userSocial.photoUrl;

    return userConverted;

  }
//  Google Authentication
  googleLogin()  {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout() {
    this.authService.signOut();
    this.auth = false;
    this.authState$.next(this.auth);
  }



  registraUser(user): Observable<string> {
    console.log(user);
    const headers = new HttpHeaders().set('responsType', 'text');
    return this.httpClient.post(`${this.SERVER_URL}/user/registration`, user, {
      headers,
      responseType: 'text' as const,
    });
  }

  updateProfile(user: any): Observable<string> {
    console.log(user);
    const headers = new HttpHeaders().set('responsType', 'text');
    return this.httpClient.post(`${this.SERVER_URL}/user/updateUser`, user, {
      headers,
      responseType: 'text' as const,
    });
  }

  Login(email, password) {
    this.user.email = email;
    this.user.password = password;
    console.log(this.user);
    this.httpClient
      .post(`${this.SERVER_URL}/user/login`, this.user)
      .subscribe((res: User) => {
        console.log(res);
        if (res !== undefined) {
          this.auth = true;
          this.firstLogin = res.firstLogin;

          this.userRole = 1;
          this.authState$.next(true);
          this.userData$.next(res);
          console.log(this.userData$);
        } else {
          this.auth = false;
          this.loginMessage$.next(
            'Incorrect email address or password, please try again'
          );
        }
        return true;
      });
  }

  getUserProfile(): Observable<any> {
    const params = new HttpParams().set('username', this.UserName.getValue());

    if (params.get('username') !== null) {
      if (!this.userProfile) {
        this.userProfile = this.httpClient
          .get<any>(
            this.baseUrlUpdateProfile + '/' + this.UserName.getValue(),
            { params }
          )
          .pipe(
            shareReplay(),
            map(
              (result) => {
                if (result.email) {
                  this.Email.next(result.email);
                }
                return result;
              },
              (error) => {
                return new Observable<Error>();
              }
            )
          );
      }
      return this.userProfile;
    } else {
      this.router.navigate(['/login']);
      return new Observable<Error>();
    }
  }

  updateUserProfile(userDetails: any) {
    const formdata = new FormData();
    const params = new HttpParams().set('username', this.UserName.getValue());

    for (const key of Object.keys(userDetails)) {
        const value = userDetails[key];
        formdata.append(key, value);
    }
    return this.httpClient.post<any>(this.baseUrlUpdateProfile, formdata, {
            // headers: { Accept: 'multipart/form-data', 'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN') },
            // params: params
        })
        .pipe(
            map((result) => {
                this.clearCache();
                return result;
            })
        );
}

clearCache() {
  this.userProfile = null;
}
}


export interface ResponseModel {
  auth: boolean;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  userId: number;
  type: string;
  role: number;
}
