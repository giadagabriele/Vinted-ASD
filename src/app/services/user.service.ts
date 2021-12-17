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
import { environment } from 'environment';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  auth = false;
  private SERVER_URL = environment.SERVER_URL;
  private baseUrlUpdateProfile = `${this.SERVER_URL}user/`;
  // tslint:disable-next-line:new-parens
  private user = new User();
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<SocialUser | ResponseModel | object>(null);
  loginMessage$ = new BehaviorSubject<string>(null);

  userRole: number;
  registerMessage: any;
  private UserName = new BehaviorSubject<string>('null');
  private Email = new BehaviorSubject<string>(null);
  // private UserRole = new BehaviorSubject<string>(this.cookieService.get('userRole'));

  private userProfile: Observable<any>;
  private activityDetails$: Observable<any>;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    authService.authState.subscribe((user: SocialUser) => {
      if (user != null) {
        this.httpClient
          .get(`${this.SERVER_URL}/users/validate/${user.email}`)
          .subscribe((res: { status: boolean; user: object }) => {
            //  No user exists in database with Social Login
            if (!res.status) {
              // Send data to backend to register the user in database so that the user can place orders against his user id
              this.registerUser(
                {
                  email: user.email,
                  fname: user.firstName,
                  lname: user.lastName,
                  password: '123456',
                },
                user.photoUrl,
                'social'
              ).subscribe((response) => {
                if (response.message === 'Registration successful') {
                  this.auth = true;
                  this.userRole = 555;
                  this.authState$.next(this.auth);
                  this.userData$.next(user);
                }
              });
            } else {
              this.auth = true;
              // @ts-ignore
              this.userRole = res.user.role;
              this.authState$.next(this.auth);
              this.userData$.next(res.user);
            }
          });
      }
    });
  }

  //  Login User with Email and Password
  loginUser(email: string, password: string) {
    this.httpClient
      .post<ResponseModel>(`${this.SERVER_URL}auth/login`, { email, password })
      .pipe(catchError((err: HttpErrorResponse) => of(err.error.message)))
      .subscribe((data: ResponseModel) => {
        if (typeof data === 'string') {
          this.loginMessage$.next(data);
        } else {
          this.auth = data.auth;
          this.userRole = data.role;
          this.authState$.next(this.auth);
          this.userData$.next(data);
        }
      });
  }

  //  Google Authentication
  googleLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout() {
    this.authService.signOut();
    this.auth = false;
    this.authState$.next(this.auth);
  }

  registerUser(
    formData: any,
    photoUrl?: string,
    typeOfUser?: string
  ): Observable<{ message: string }> {
    const { fname, lname, email, password } = formData;
    console.log(formData);
    return this.httpClient.post<{ message: string }>(
      `${this.SERVER_URL}/auth/register`,
      {
        email,
        lname,
        fname,
        typeOfUser,
        password,
        photoUrl: photoUrl || null,
      }
    );
  }
  registraUser(user: User): Observable<string> {
    console.log(user);
    const headers = new HttpHeaders().set('responsType', 'text');
    return this.httpClient.post(`${this.SERVER_URL}user/registration`, user, {
      headers,
      responseType: 'text' as const,
    });
  }

  Login(email, password) {
    this.user.email = email;
    this.user.password = password;
    this.httpClient
      .post(`${this.SERVER_URL}user/login`, this.user)
      .subscribe((res) => {
        console.log(res);
        if (res !== undefined) {
          this.auth = true;
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
