import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';



@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
    constructor(
        private router: Router,
        private activatedRoute : ActivatedRoute
    ){}

    ngOnInit(): void {
        throw new Error ('Method not implemented');
    }

    navigateToContact(){
        this.router.navigateByUrl('/contact')
    }
}