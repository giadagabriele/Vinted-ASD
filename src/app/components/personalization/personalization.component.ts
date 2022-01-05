import { CategoryService } from './../../services/category.service';
import { User } from './../../models/user.model';
import { Observable } from 'rxjs';
import { UserService } from '@app/services/user.service';
import { PersonalizationData } from './../../models/personalization.model';
import { Component, OnInit, NgModule } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { PersonalizationService } from '@app/services/personalization.service';
import { Category } from '@app/models/product.model';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';



@Component({
    selector: 'app-personalization',
    templateUrl: './personalization.component.html',
    styleUrls: ['./personalization.component.scss'],
})
export class PersonalizationComponent implements OnInit {
     list: Array<PersonalizationData> = new  Array<PersonalizationData>() ;
     listCategories= new  Array<Category>();
     myUser:User;
     disabled=true;
     
     constructor(
        private router: Router,
        private activatedRoute : ActivatedRoute,
        private userService: UserService,
        private personalizationService: PersonalizationService,
        private categoryService: CategoryService
    ){
        this.userService.userData$
        .subscribe((data: User) => {
          this.myUser = data;
        });
        this.personalizationService.getAllByUserId().subscribe(
            (data:any) => {
              console.log(data);
            
              this.list=data;
        });
    }
    

    ngOnInit(): void {
        this.categoryService.getAllCategories().subscribe(
            (data:any) => {
             
              this.listCategories=data;
        });
        setTimeout (() => {  
        this.list.forEach((element) => {
            console.log(element.value);
            (<HTMLInputElement>document.getElementById(element.value)).checked=true;
        });
    }, 1000);
        console.log(this.list);
        console.log(this.myUser)
    }

    addDelChoice(category,value){
        var found= false;
        var idCategory=this.getIdCategoryByName(category);
        console.log(idCategory)
        this.list.forEach((element,index) => {
            if(element.category.id===idCategory.id && element.value===value){
                this.list.splice(index,1);
                found=true;
            }
        });
      
      
           
                       
        if(found){
            this.disabled=true; 
            return;
        }
            
        var obj= new PersonalizationData;     
        obj.category=idCategory;
        obj.value=value;
        obj.user=this.myUser;
        this.list.push(obj);
        this.disabled=false;
        console.log(this.list)
        
    
    }

    save(){
        console.log("OKK")
       this.personalizationService.save(this.list);
       this.myUser.firstLogin=false;
       this.userService.updateProfile(this.myUser).subscribe();
       this.router.navigateByUrl("/")
    }

    skip(){
        this.myUser.firstLogin=false;
        this.userService.updateProfile(this.myUser).subscribe();
        this.router.navigateByUrl("/")
    }

    getIdCategoryByName(name){
        var category;     
        this.listCategories.forEach(element => {
            console.log(element)
            if(element.name===name ){
                category=element;
            }
        });
        return category;
      }

    navigateToPersonalization(){
        this.router.navigateByUrl('/personalization')
    }
}