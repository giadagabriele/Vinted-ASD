import { Component, OnInit } from "@angular/core";
import { AuthService, SocialUser } from "angularx-social-login";
import { ResponseModel, UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { User } from "@app/models/user.model";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  myUser: any;
  userProfile: User;
  isProfileLoaded: boolean = false;

  /* Properties for the profile form */
  updateProfileForm: FormGroup;
  userid: FormControl;
  email: FormControl;
  username: FormControl;
  phone: FormControl;
  birthdate: FormControl;
  gender: FormControl;
  displayname: FormControl;
  address1: FormControl;
  address2: FormControl;
  country: FormControl;
  city: FormControl;
  state: FormControl;
  postalcode: FormControl;
  saddress1: FormControl;
  saddress2: FormControl;
  scountry: FormControl;
  scity: FormControl;
  sstate: FormControl;
  spostalcode: FormControl;
  profpicfile: FormControl;
  firstname: FormControl;
  lastname: FormControl;
  middlename: FormControl;
  isTwoFactorOn: FormControl;
  isPhoneVerified: FormControl;
  isEmailVerified: FormControl;
  isTermsAccepted: FormControl;
  unit: FormControl;
  sunit: FormControl;
  userRole: string;

  private genderValues = ["Male", "Female", "Other"];
  modalMessage: string;
  modalTitle: string;
  errorList: string[] = [];

  // constructor(private fb: FormBuilder,
  //   private acct: AccountService,

  //    private countryservice: CountryService) {}

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    //this.loadUserProfile();
    //window.scroll(0, 0);

    this.userService.userData$
      .pipe(
        map((user: SocialUser | ResponseModel) => {
          if (user instanceof SocialUser || user.type === "social") {
            return {
              ...user,
              email: "test@test.com",
            };
          } else {
            return user;
          }
        })
      )
      .subscribe((data: ResponseModel | SocialUser) => {
        this.myUser = data;
      });
  }

  logout() {
    this.userService.logout();
  }
  loadUserProfile() {
    this.userService.getUserProfile().subscribe((result) => {
      this.userProfile = {
        id: result.id,
        email: result.email,
        username: result.username,
        phoneNumber: result.phoneNumber,
        //birthday: result.birthday,
        firstName: result.firstName,
        lastName: result.lastName,
        password: result.password,
        // profpicfile: result.profilePic,
        // isTwoFactorOn: result.isTwoFactorOn,
        // isPhoneVerified: result.isPhoneVerified,
        // isEmailVerified: result.isEmailVerified,
        //isTermsAccepted: result.isTermsAccepted,
      };

      this.createFormGroup();

      this.isProfileLoaded = true;

      // console.log(this.ProfileDetails);
    });
  }

  createFormGroup() {
    this.userid = new FormControl(this.userProfile.id, [Validators.required]);
    this.email = new FormControl(this.userProfile.email, [
      Validators.required,
      Validators.email,
    ]);
    this.username = new FormControl(this.userProfile.username, [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(5),
    ]);
    this.phone = new FormControl(this.userProfile.phoneNumber, [
      Validators.required,
      Validators.pattern(
        "^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"
      ),
    ]);
    //this.birthdate = new FormControl(this.userProfile.birthday, [Validators.required]);
    //this.gender = new FormControl(this.userProfile.gender);

    //this.profpicfile = new FormControl(this.userProfile.profpicfile);
    this.firstname = new FormControl(this.userProfile.firstName, [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(2),
    ]);
    this.lastname = new FormControl(this.userProfile.lastName, [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(2),
    ]);
    //this.isTwoFactorOn = new FormControl(this.userProfile.isTwoFactorOn);
    //this.isPhoneVerified = new FormControl(this.userProfile.isPhoneVerified);
    //this.isEmailVerified = new FormControl(this.userProfile.isEmailVerified);
    //this.isTermsAccepted = new FormControl(this.userProfile.isTermsAccepted, [Validators.requiredTrue]);

    this.updateProfileForm = this.fb.group({
      userid: this.userid,
      email: this.email,
      username: this.username,
      phone: this.phone,
      birthdate: this.birthdate,
      // gender: this.gender,
      //country: this.country,
      //city: this.city,
      //state: this.state,
      firstname: this.firstname,
      middlename: this.middlename,
      lastname: this.lastname,
      profpicfile: this.profpicfile,
      //isTwoFactorOn: this.isTwoFactorOn,

      // isPhoneVerified: this.isPhoneVerified,
      //isEmailVerified: this.isEmailVerified,
      //isTermsAccepted: this.isTermsAccepted
    });
  }
  showErrorModal() {
    this.modalTitle = "Update Error";
    this.modalMessage = "Please review errors and try again";
  }

  triggerInput() {
    $("#profpicfile").trigger("click");
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        let file = event.target.files[0];
        this.updateProfileForm.get('profpicfile').setValue(file);
        reader.readAsDataURL(file);
        reader.onload = () => {
            $('#profpic')
                .find('img')
                .attr('src', reader.result as string);
        };
    }
}
onSubmit() {
  if (this.updateProfileForm.valid) {
      this.isProfileLoaded = false;
      let userDetails = this.updateProfileForm.value;
      // userDetails.country = this.ProfileDetails.billingAddress.country;
      // userDetails.scountry = this.ProfileDetails.shippingAddress.country;
         //userDetails.gender =
         // this.userProfile.Ge == 'null' || this.ProfileDetails.gender == '' ? 'Prefer Not To Say' : this.ProfileDetails.gender;

      Swal.fire({
          title: 'Enter your password',
          input: 'password',
          inputAttributes: {
              autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Update Profile',
          showLoaderOnConfirm: true,
          preConfirm: (password) => {
              userDetails.password = password;
              this.userService.updateUserProfile(userDetails).subscribe((result) => {
                  this.toastr.success(result.message);
                  this.userService.clearCache();
                  this.loadUserProfile();
                  this.isProfileLoaded = true;
              });
          }
      }).then((result) => {
          if (result.dismiss) {
              this.isProfileLoaded = true;
          }
      });
  } else {
      this.errorList = [];
      const controls = this.updateProfileForm.controls;

      for (let name in controls) {
          if (controls[name].invalid) {
              let errorDescription = '';
              if (controls[name].hasError('required')) {
                  switch (name) {
                      // case 'isTermsAccepted':
                      //     errorDescription = 'acceptance of Term is required';
                      //     this.errorList.push(errorDescription);
                      //     break;
                  }
              } else {
                  errorDescription = 'Please review ' + name;
                  this.errorList.push(errorDescription);
              }
              controls[name].markAsTouched();
          }
      }
      console.log(this.errorList);
      this.showErrorModal();
  }
}

}
