import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '@app/services/message.service';
import { User } from '@app/models/user.model';
import { SocialUser } from 'angularx-social-login';
import { UserService } from '@app/services/user.service';
@Component({
  selector: 'app-inout',
  templateUrl: './inout.component.html',
  styleUrls: ['./inout.component.scss']
})
export class InoutComponent implements OnInit {
  [x: string]: any;
  usergoogle: SocialUser;
  user: User;
  inbox: {};
  sentMail: {};
  constructor(private userService: UserService, private messageService: MessageService) {
    this.userService.userData$
    .subscribe((data: User) => {
      this.user = data;
    });
    console.log(this.user.id);
   }

  ngOnInit(): void {
    this.mail();
  }

  mail() {
    let messages = [];
    this.messageService.getMessage(this.user.id).subscribe((data: any) =>  {
      messages = data;
      this.inbox = messages.filter(mail => mail.recieverId === this.user.id.toString());
      this.sentMail = messages.filter(mail => mail.senderId === this.user.id.toString());
      console.log(this.sentMail);
        // tslint:disable-next-line:align
        if (messages.length > 0) {
          console.log(this.inbox);
          // this.displayOrNot = false;
        }
      },
      (error: any)   => console.log(error),
      ()             => console.log('all data gets')
    );

  }

}
