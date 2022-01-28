import { PaymenthistoryService } from './../../services/paymenthistory.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/services/authentication.service';
import { User } from '@app/models/user.model';

@Component({
  selector: 'app-paymenthistory',
  templateUrl: './paymenthistory.component.html',
  styleUrls: ['./paymenthistory.component.scss']
})
export class PaymenthistoryComponent implements OnInit {
 user: User;
 payHistory: any;
  constructor(private paymenthistoryService: PaymenthistoryService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser
    .subscribe((data: User) => {
      this.user = data;
    });

   }

  ngOnInit() {
    this.paymentHistory();
  }

  paymentHistory() {
    // this.typeMessage = type;
    this.paymenthistoryService.getPaymenthistoryByUser(this.user.id).subscribe((data: any) =>  {
      // this.messages = data;
      this.payHistory = data;
      // this.inbox = data.filter(mail => mail.recieverId === this.user.id.toString());
      // this.sentMail = data.filter(mail => mail.senderId === this.user.id.toString());
      console.log(data);
        // tslint:disable-next-line:align
      },
      (error: any)   => console.log(error),
      ()             => console.log('all data gets')
    );

  }


}
