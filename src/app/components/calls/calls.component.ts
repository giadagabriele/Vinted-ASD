import { MessageService } from '@app/services/message.service';
import { ModalComponent } from './../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from '@app/components/header/header.component';
import { User } from './../../models/user.model';
import { AuthenticationService } from '@app/services/authentication.service';
import { CallRequestService } from './../../services/callRequest.service';
import { CallRequest } from './../../models/callRequest.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss']
})
export class CallsComponent implements OnInit {
  notifications: CallRequest[];
  notifiLength = 0;
  currentUser: User;
  page = 1;
  pageSize = 4;
  constructor(
    private callRequestService:CallRequestService,private authenticationService:AuthenticationService,private messageService:MessageService,
   private modalService:NgbModal) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    this.callRequestService.getAllResponsesByUserId(this.currentUser.id).subscribe((data: CallRequest[]) =>  {
    console.log(data)
    this.notifications = data;
     
        this.notifiLength = this.notifications.length;
     
    },
    (error: any)   => console.log(error),
    ()             => console.log('all data gets')
  );}

  ngOnInit(): void {
    
    this.refreshNotifications();

  }
  refreshNotifications() {
    setTimeout(() => 
{
  this.notifications 
      .map((noti, i) => ({id: i + 1, ...noti}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
},
200);
  }
  deleteNotification(cr:CallRequest) {
  // this.headerComponent.deleteNotification(cr);
  cr.status=2;
  console.log(cr)
  this.callRequestService.save(cr).subscribe(resp=>{
   const modalRef = this.modalService.open(ModalComponent);
  if(resp){
    modalRef.componentInstance.name = "Request denied successfully";
  }
  else
   modalRef.componentInstance.name = "There was a problem, please try again later";
  

});
setTimeout(() => 
{
  this.refreshNotifications()
},
200);

  }
  acceptNotification(cr:CallRequest) {
    cr.status=1;
    console.log(cr)
    this.callRequestService.save(cr).subscribe(resp=>{
     const modalRef = this.modalService.open(ModalComponent);
    if(resp){
      modalRef.componentInstance.name = "Request accepted successfully";
    }
    else
     modalRef.componentInstance.name = "There was a problem, please try again later";
    
  
  });
  
 
   }
   report(cr){
     cr.status=2;
     this.callRequestService.save(cr);
    if (confirm('Are you sure you want to report as call spam ' )) {
      const newReport: any = { user: cr.userOfRequest.id, reason: "call spam", reportedBy: cr.userOfResponse.id };
      this.messageService.addReport(newReport)
            .subscribe(
                (data: any) => {
                    console.log('created: ', data);
                  //  this.closeToggle.close();
                },
                (error: any) => console.log(error),
                () => console.log('completed')
            );
    }
   }
   toggleMessage(popover) {
  //  this.closeToggle = popover;
    console.log(popover);
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }
}
