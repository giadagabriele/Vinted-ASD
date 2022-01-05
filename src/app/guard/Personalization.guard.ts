import { User } from '@app/models/user.model';

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalizationGuard implements CanActivate {
  constructor(private userService: UserService,
              private router: Router) {
                this.userService.userData$
                .subscribe((data: User) => {
                  this.userAuth = data;
                });
              
 }
  userAuth:User;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.auth ){
      if( this.userAuth.firstLogin === false) 
        return true;
      
      else
        this.router.navigate(['/personalization']).then();
      
     } else {
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}}).then();
      }
      return false;
    }

  }


