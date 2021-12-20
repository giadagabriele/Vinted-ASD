import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  daysOfTheWeek = [
    'Lunedì',
    'Martedì',
    'Mercoledì',
    'Giovedì',
    'Venerdì'
  ];

  availableOffices = [
    {id: 'A', name: 'ufficio_A'},
    {id: 'B', name: 'ufficio_B'},
    {id: 'C', name: 'ufficio_C'},
  ];

  applications = [
    {id: 0},
    {id: 1},
    {id: 2}
  ];

}