import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';



@Component({
    selector: 'app-clothes',
    templateUrl: './clothes.component.html',
    styleUrls: ['./clothes.component.scss'],
})
export class ClothesComponent implements OnInit {
    constructor(
        private router: Router,
        private activatedRoute : ActivatedRoute
    ){}

    ngOnInit(): void {
        throw new Error ('Method not implemented');
    }

    navigateToClothes(){
        this.router.navigateByUrl('/clothes')
      }
}