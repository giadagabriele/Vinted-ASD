import { User } from './../../models/user.model';
import {Component, OnInit, ViewChild} from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import {CheckEmailService} from '../../validators/check-email.service';
import {UserService} from '../../services/user.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [EmailValidator]
})
export class RegisterComponent implements OnInit {
  formChangesSubscription: FormGroup;
  
  
  // tslint:disable-next-line:max-line-length
  private emailPattern = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';
  comparePassword: boolean;
  registrationMessage: string;
  user= new User;
  name:String;
  submitted=false;
  loding=false;
    
  constructor(private fb: FormBuilder,
              private checkEmailService: CheckEmailService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute
              ) {

              


              }  


  ngOnInit(): void {
    this.comparePassword=true;
      this.formChangesSubscription = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        email : ['', [Validators.required, Validators.email]]
    });

  }
  
  
  
  get f() { return this.formChangesSubscription.controls; }

  
  comparePasswordFunc(){

    if (this.f.confirmPassword.value === this.f.password.value)
      return  true;
    else 
    return false;
    
  }

  onSubmit() {
    this.submitted = true;
    this.comparePassword=this.comparePasswordFunc();
    console.log(this.comparePassword)
    if (this.formChangesSubscription.invalid|| !this.comparePassword) {
      return;
  }
  console.log(this.formChangesSubscription.value);
  
    this.userService.registraUser(this.formChangesSubscription.value).subscribe(
      response => {
        console.log(response);
        if (response === "success") {
          this.router.navigate(['/login']);
        }else{
         this.registrationMessage=response;
       }
      });
   
    

 
 
    
  }
  
 
}
