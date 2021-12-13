import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';



@Component({
    selector: 'app-clothes',
    templateUrl: './shoes.component.html',
    styleUrls: ['./shoes.component.scss'],
})
export class ShoesComponent implements OnInit {
    constructor(
        private router: Router,
        private activatedRoute : ActivatedRoute
    ){}

    ngOnInit(): void {
        throw new Error ('Method not implemented');
    }

    navigateToShoes(){
        this.router.navigateByUrl('/shoes')
      }
}