import { Component, Input, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {UserService} from '../../services/user.service';
import { SocialUser, AuthService } from 'angularx-social-login';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { User } from '@app/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  formChangesSubscription: FormGroup;
  // tslint:disable-next-line:new-parens
  usergoogle: SocialUser;
  user: User;
  @Input() fromParent;
  @Input() public productUser;
  displayOrNot: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService,
              // tslint:disable-next-line:max-line-length
              private userService: UserService, private router: Router, private messageService: MessageService, public activeModal: NgbActiveModal ) {
                this.userService.userData$
                .subscribe((data: User) => {
                  this.user = data;
                });
                console.log(this.user.email);
              }

  ngOnInit(): void {
    // this.inBox();
    console.log(this.productUser);
    // if (!this.userService.auth) {
    // this.router.navigateByUrl( '/login');
    // }

    this.formChangesSubscription = this.fb.group({
      senderId: [`${this.user.id}`],
      recieverId: [`${this.productUser.user}`],
      subject: [''],
      description: ['']
  });

  }
  get f() { return this.formChangesSubscription.controls; }

  onSubmit() {
    this.messageService.postMessage(this.formChangesSubscription.value).subscribe(
      response => {
        console.log(response);
        this.formChangesSubscription.reset();
        this.closeModal('close');
        if (response === 'success') {
          // tslint:disable-next-line:no-unused-expression
          this.formChangesSubscription.reset();
          console.log(' the messsage is successfully sent')
        }
      });

  }
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

}
