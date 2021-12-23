import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-drop-down-form',
  templateUrl: './drop-down-form.component.html',
  styleUrls: ['./drop-down-form.component.scss']
})
export class DropDownFormComponent {
  constructor(config: NgbDropdownConfig) {
    config.placement = 'top-right';
    config.autoClose = true;
  }
}