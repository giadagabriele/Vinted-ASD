import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService, SocialUser } from 'angularx-social-login';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import { FormGroup,FormBuilder, Validators,  } from '@angular/forms';

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
  usergoogle: SocialUser;
  userRole: number;
  container = <HTMLInputElement>document.getElementById("container");
  formSignIn: FormGroup;
  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private route: ActivatedRoute) {
                this.route.queryParams.subscribe(params => {
                  this.loginMessage = params['message'];
                  console.log(this.loginMessage);})
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user)=>{
      this.usergoogle=user;
      console.log(this.usergoogle);
    });
    this.userService.authState$.subscribe(authState => {
      if (authState) {
        this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || '/profile');

      } else {
        this.router.navigateByUrl('/login');
      }
    });
    this.formSignIn = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email : ['', [Validators.required, Validators.email]]
  });
   

  }
  cambia(){
    this.container.classList.add("right-panel-active");
  }
  signInWithGoogle() {
    this.userService.googleLogin();
    
  }
  get f() { return this.formSignIn.controls; }

  login() {
    
    const email = this.f.email.value;
    const password = this.f.password.value;

    console.log(email,password)
    this.formSignIn.reset();
  
    this.userService.loginMessage$.subscribe(msg => {
      this.loginMessage = msg;
      console.log(msg)
    });
    this.userService.Login(email,password);
    

    


  }
}
