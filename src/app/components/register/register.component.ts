import { AuthenticationService } from './../../services/authentication.service';
import { City } from './../../models/city.model';
import { CityService } from './../../services/city.service';
import { ModalComponent } from './../modal/modal.component';
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
  noResult = false;
  citiesDB: City[];
  cities: string[] = [];
  returnUrl: string;

  constructor(private fb: FormBuilder,
              private checkEmailService: CheckEmailService,
              private userService: UserService,
              private cityService: CityService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private authService:AuthService,
              private authenticationService:AuthenticationService
              ) {




              }


  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
   
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/']);
  }
    this.cityService.getAll().subscribe(
      (data:City[]) => {
        this.citiesDB = data;
        this.citiesDB.forEach(element => {
          this.cities.push(element.name);
        });
      },
      (error: any)   => console.log(error),
      ()             => console.log(this.cities),
      );
    this.comparePassword=true;
      this.formChangesSubscription = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        email : ['', [Validators.required, Validators.email]],
        city:[''],
        profilePic:['/assets/img/img_avatar.png'],
      });

  }


  typeaheadNoResults(event: boolean): void {
    console.log(event)
    this.noResult = event;
  }
  get f() { return this.formChangesSubscription.controls; }


  comparePasswordFunc(){

    if (this.f.confirmPassword.value === this.f.password.value)
      return  true;
    else
    return false;

  }
  setCity(){
    this.citiesDB.forEach(element => {
      if(element.name === this.f.city.value)
        this.user.city=element;
    
    });
  }

  onSubmit() {
    this.submitted = true;
    this.comparePassword=this.comparePasswordFunc();
    this.user=this.formChangesSubscription.value;
    this.setCity();
    
    if (this.formChangesSubscription.invalid|| !this.comparePassword) {
      return;
    }
  
    this.userService.registraUser(this.user).subscribe(
      response => {
        console.log(response);
        const modalRef = this.modalService.open(ModalComponent);
          modalRef.componentInstance.name = response;

          if (response === "Congratulations, your account has been successfully created.") {
            this.submitted = false;
            this.formChangesSubscription.reset;
       }
      });
  }
  
  signInWithGoogle() {
    this.authenticationService.googleLogin();
    
    this.authenticationService.loginMessage$.subscribe(msg => {
      console.log(msg)
      if (msg === "Congratulations, your account has been successfully created.")
      console.log(msg)
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
