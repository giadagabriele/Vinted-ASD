import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';



@Component({
    selector: 'app-clothes',
    templateUrl: './technology.component.html',
    styleUrls: ['./technology.component.scss'],
})
export class TechnologyComponent implements OnInit {
    constructor(
        private router: Router,
        private activatedRoute : ActivatedRoute
    ){}

    ngOnInit(): void {
        throw new Error ('Method not implemented');
    }

    navigateToTechnology(){
        this.router.navigateByUrl('/technology')
    }
}