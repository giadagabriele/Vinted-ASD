import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '@app/services/message.service';
import { User } from '@app/models/user.model';
import { SocialUser } from 'angularx-social-login';
import { UserService } from '@app/services/user.service';
import { MessageComponent } from '../message.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  typeMessage: 'Inbox';
  message: any;
  constructor(private userService: UserService, private messageService: MessageService, private modalService: NgbModal) {
    this.userService.userData$
    .subscribe((data: User) => {
      this.user = data;
    });
    console.log(this.user.id);
   }

  ngOnInit(): void {
    this.mail('Inbox');
  }

  mail(type: any) {
    this.typeMessage = type;
    this.messageService.getMessage(this.user.id).subscribe((data: any) =>  {
      this.messages = data;
      this.inbox = data.filter(mail => mail.recieverId === this.user.id.toString());
      this.sentMail = data.filter(mail => mail.senderId === this.user.id.toString());
      if (type === 'Inbox') {
       this.message = this.inbox;
      } else if (type === 'Sent Messages') {
        this.message = this.sentMail;
      } else {
        this.message = data;
      }
      console.log(this.sentMail);
        // tslint:disable-next-line:align
        if (this.messages.length > 0) {
          console.log(this.inbox);
          // this.displayOrNot = false;
        }
      },
      (error: any)   => console.log(error),
      ()             => console.log('all data gets')
    );

  }
  // tslint:disable-next-line:ban-types
  writeMessage(reciever: any) {
    console.log(reciever, this.user.id);

    const modalRef = this.modalService.open(MessageComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      });
    modalRef.componentInstance.productUser = {user: reciever};
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('test');
    });
  }
  reportSpam(reciever: any) {

  }
// tslint:disable-next-line:ban-types
delete(reciever: number) {
  this.messageService.deleteMessage(reciever).subscribe(
    (res: any) => this.mail(this.typeMessage),
    (error: any) => console.log(error),
    () => console.log('deleted')
  );
  }

}
function id(id: any) {
  throw new Error('Function not implemented.');
}
