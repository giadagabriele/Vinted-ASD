import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {UserService} from '../services/user.service';
import { SocialUser, AuthService } from 'angularx-social-login';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  formChangesSubscription: FormGroup;
  // tslint:disable-next-line:new-parens
  user: any;
  usergoogle: SocialUser;
  constructor(private fb: FormBuilder, private authService: AuthService,
              private userService: UserService, private router: Router, private messageService: MessageService ) { }

  ngOnInit(): void {
    if (!this.userService.auth) {
    this.router.navigateByUrl( '/login');
    }

    this.formChangesSubscription = this.fb.group({
      recieverId: [''],
      subject: [''],
      description: [''],
  });

  }
  get f() { return this.formChangesSubscription.controls; }

  onSubmit() {
    console.log(this.formChangesSubscription.value);
    this.messageService.postMessage(this.formChangesSubscription.value).subscribe(
      response => {
        console.log(response);
        if (response === 'success') {
        }
      });

  }
// export set {
//   data() {
//     return {
//       sending: false,
//       robotCheckInvalid: true,
//       form: {
//         error: '',
//         success: '',

//         email: '',
//         subject: '',
//         name: '',
//         message: '',
//       },
//     }
//   },

//   methods: {
//     async onSubmit() {
//       try {
//         this.sending = true
//         this.form.error = ''
//         this.form.success = ''
//         await this.$http.mailer.send(
//           this.form.name,
//           this.form.email,
//           this.form.subject || 'Contact us message from Unknown Heroes',
//           this.form.message
//         )

//         this.form.success = 'Thank you for your email.'
//       } catch (ex) {
//         this.form.error = ex.message || ex
//       } finally {
//         this.sending = false
//         window.scrollTo({ top: 0, behavior: 'smooth' })
//       }
//     },

//     onError() {
//       this.robotCheckInvalid = true
//     },

//     onSuccess() {
//       this.robotCheckInvalid = false
//     },

//     onExpired() {
//       this.robotCheckInvalid = true
//     },
//   },
// }

}
