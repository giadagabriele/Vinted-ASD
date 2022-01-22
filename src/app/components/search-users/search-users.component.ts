import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit {
  usersDb: User[];
  searchText:string;
  constructor(private route: ActivatedRoute,private userService: UserService) { }

  ngOnInit(): void {

    this.route.paramMap
    .pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.searchText;
      })
    ).subscribe(st => {
this.searchText=st;
  });

  this.userService.getAll().subscribe((data: User[]) =>  {
    this.usersDb = data;
  },
  (error: any)   => console.log(error),
  
);

}



}