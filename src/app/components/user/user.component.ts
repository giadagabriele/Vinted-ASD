import { User } from '@app/models/user.model';
import { map } from 'rxjs/operators';
import { UserService } from '@app/services/user.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  usertoview : User;
  myUser:User;
  constructor(private userService: UserService,private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal) { this.userService.userData$
      .subscribe((data: User) => {
        this.myUser = data;
      }); }

  ngOnInit(): void {
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
