import { ModalComponent } from './../modal/modal.component';
import { CallRequestService } from './../../services/callRequest.service';
import { CallRequest } from './../../models/callRequest.model';
import { User } from '@app/models/user.model';
import { map, tap } from 'rxjs/operators';
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
  username:string;
  canRequest=true;
  canSeeNumber=false;
  isDataLoaded=false;
  constructor(private userService: UserService,private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,private callRequestService:CallRequestService) {  
      this.isDataLoaded=false;
      this.authenticationService.currentUser.subscribe((data: User) => {
      this.myUser = data;
    });

   /*  this.route.paramMap
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
            this.controlRequestCall();
            console.log(this.usertoview)

          });

      });
 */    this.route.params.subscribe((params) => {
        this.username=params.username;
      });
      this.userService.getUserByUsername(this.username).subscribe((user:User)=>
      {
        console.log(user)
        if(this.myUser.username===user.username)
           this.router.navigateByUrl('/profile');
        this.usertoview=user;
      });

      this.userService.getUserByUsername(this.username).pipe(tap((user:User)=>
      {
        console.log(user)
        if(this.myUser.username===user.username)
           this.router.navigateByUrl('/profile');
        this.usertoview=user;
        
      }
        
        ),tap(_=>this.controlRequestCall())).subscribe();
      
    }
 
  ngOnInit(): void {
 
  }
  controlRequestCall(){
    this.isDataLoaded=true;
    console.log(this.usertoview)
    this.controlSeeNumber();
    if(this.usertoview.phoneNumber===null)
      this.canRequest=false;
      else{
        this.callRequestService.getAllResponsesByUserId(this.usertoview.id).subscribe((data: CallRequest[]) =>  {
          console.log(data)
          data.forEach((element:CallRequest) => {
            console.log(element.userOfRequest)
            console.log(this.myUser)
            if(element.userOfRequest.id==this.myUser.id)
            this.request=false
          });
          
          
          },
          (error: any)   => console.log(error),
          ()             => console.log('all data gets')
        );
      }
  }
  controlSeeNumber(){
    this.isDataLoaded=true;
    console.log(this.usertoview)
    if(this.usertoview.phoneNumber===null)
      this.canRequest=false;
      else{
        this.callRequestService.getAllResponsesByUserId(this.usertoview.id).subscribe((data: CallRequest[]) =>  {
          console.log(data)
          data.forEach((element:CallRequest) => {
            console.log(element.userOfRequest)
            console.log(this.myUser)
            if(element.userOfRequest.id==this.myUser.id && element.status==1){
              this.canSeeNumber=true;
              this.request=false;
          }
        });
          
          
          },
          (error: any)   => console.log(error),
          ()             => console.log('all data gets')
        );
      }
  }
  requestPhoneNumber(){
    
   const callRequest = new CallRequest;
   console.log(this.myUser)
   console.log(this.usertoview )
   callRequest.userOfRequest=this.myUser;
   callRequest.userOfResponse=this.usertoview;

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
