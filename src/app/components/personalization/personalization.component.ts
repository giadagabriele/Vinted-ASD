import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';



@Component({
    selector: 'app-personalization',
    templateUrl: './personalization.component.html',
    styleUrls: ['./personalization.component.scss'],
})
export class PersonalizationComponent implements OnInit {
    constructor(
        private router: Router,
        private activatedRoute : ActivatedRoute
    ){}

    ngOnInit(): void {
        throw new Error ('Method not implemented');
    }

    navigateToPersonalization(){
        this.router.navigateByUrl('/personalization')
    }
}