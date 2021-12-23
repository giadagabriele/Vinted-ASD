import { SocialUser, AuthService } from 'angularx-social-login';
import { User } from './../../models/user.model';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import {CheckEmailService} from '../../validators/check-email.service';
import {UserService} from '../../services/user.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import { JsonpClientBackend } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [EmailValidator]
})
export class RegisterComponent implements OnInit {
  formChangesSubscription: FormGroup;
  usergoogle :SocialUser;

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
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private authService:AuthService
              ) {




              }


  ngOnInit(): void {
    this.authService.authState.subscribe((user)=>{
      this.usergoogle=user;
      console.log(this.usergoogle);
    });
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
          const modalRef = this.modalService.open(NgbdModalContent);
          modalRef.componentInstance.name = response;

       }
      });






  }
  signInWithGoogle() {

    this.userService.googleLogin();
    console.log(this.usergoogle);
    this.userService.registraUser(this.usergoogle).subscribe(
      response => {
        console.log(response);
          const modalRef = this.modalService.open(NgbdModalContent);
          modalRef.componentInstance.name = response;

          if (response === "Congratulations, your account has been successfully created.") {
            this.submitted = false;
            this.formChangesSubscription.reset;

          }
      });

  }

}
@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Info!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}
