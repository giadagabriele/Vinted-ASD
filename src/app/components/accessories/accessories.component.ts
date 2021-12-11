import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';



@Component({
    selector: 'app-clothes',
    templateUrl: './accessories.component.html',
    styleUrls: ['./accessories.component.scss'],
})
export class AccessoriesComponent implements OnInit {
    constructor(
        private router: Router,
        private activatedRoute : ActivatedRoute
    ){}

    ngOnInit(): void {
        throw new Error ('Method not implemented');
    }

    navigateToAccessories(){
        this.router.navigateByUrl('/accessories')
    }
}