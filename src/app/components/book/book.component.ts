import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';



@Component({
    selector: 'app-clothes',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
    constructor(
        private router: Router,
        private activatedRoute : ActivatedRoute
    ){}

    ngOnInit(): void {
        throw new Error ('Method not implemented');
    }

    navigateToBook(){
        this.router.navigateByUrl('/book')
    }
}