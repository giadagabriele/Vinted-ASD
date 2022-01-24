import { AuthenticationService } from './../../services/authentication.service';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService, SocialUser } from 'angularx-social-login';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import { FormGroup,FormBuilder, Validators,  } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loginMessage: string;
  user;
  returnUrl: string;
  submited=false;
  usergoogle: SocialUser;
  userRole: number;
  container = <HTMLInputElement>document.getElementById("container");
  formSignIn: FormGroup;
  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private route: ActivatedRoute, private authenticationService: AuthenticationService) {
                this.route.queryParams.subscribe(params => {
                  this.loginMessage = params['message'];
                  console.log(this.loginMessage);})
                  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
   
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/']);
  }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
   
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/']);
  }
    this.formSignIn = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email : ['', [Validators.required, Validators.email]]
  });
   

  }
  cambia(){
    this.container.classList.add("right-panel-active");
  }
  signInWithGoogle() {
   
    this.authenticationService.googleLogin();
      console.log(this.authenticationService.currentUserValue)
   if (this.authenticationService.currentUserValue)
        this.router.navigate([this.returnUrl]);

      console.log(this.usergoogle);
      sessionStorage.setItem('id',this.user.id)
      console.log("ciao bro",sessionStorage.getItem('id'))
   
  }
  get f() { return this.formSignIn.controls; }

  login() {
    this.submited=true;
    if(this.formSignIn.invalid)
      return;
    

    
   
    this.authenticationService.login(this.f.email.value, this.f.password.value).pipe(first())
    .subscribe(
        data => {
          if(data!=null)
          this.router.navigate([this.returnUrl]);
        },
     
        );
    this.authenticationService.loginMessage$.subscribe(msg => {
      this.loginMessage = msg;
      console.log(msg)
    });
   
    
    
    
    


  }
}
