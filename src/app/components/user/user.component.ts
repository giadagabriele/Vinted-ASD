import { ModalComponent } from './../modal/modal.component';
import { CallRequestService } from './../../services/callRequest.service';
import { CallRequest } from './../../models/callRequest.model';
import { User } from '@app/models/user.model';
import { map } from 'rxjs/operators';
import { UserService } from '@app/services/user.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageComponent } from '../message/message.component';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  usertoview : User;
  myUser: User
  request=true;
  constructor(private userService: UserService,private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,private callRequestService:CallRequestService) {  this.authenticationService.currentUser.subscribe((data: User) => {
      this.myUser = data;
    });
    this.route.paramMap
      .pipe(
        map((param: ParamMap) => {
          // @ts-ignore
          return param.params.username;
        })
      )
      .subscribe(username => {
        this.userService.getUserByUsername(username).subscribe((user:User)=>
          {
            console.log(user)
            if(this.myUser.username===user.username)
               this.router.navigateByUrl('/profile');
            this.usertoview=user;
            
            console.log(this.usertoview)

          });
      
      });
     }

  ngOnInit(): void {
   
  }
  requestPhoneNumber(){
    
   const callRequest = new CallRequest;
   console.log(this.myUser)
   console.log(this.usertoview )
   callRequest.user_of_request=this.myUser;
   callRequest.user_of_response=this.usertoview;

   this.callRequestService.save(callRequest).subscribe(resp=>{
     const modalRef = this.modalService.open(ModalComponent);
     if(resp){
     modalRef.componentInstance.name = "Request sent successfully";
     this.request=false;
     }
     else
      modalRef.componentInstance.name = "There was a problem, please try again later";
     
 
   });


  }
  openMessageModal() {
    const modalRef = this.modalService.open(MessageComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      });
    modalRef.componentInstance.productUser = {user: this.usertoview.id};
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('test');
    });
  }

}
