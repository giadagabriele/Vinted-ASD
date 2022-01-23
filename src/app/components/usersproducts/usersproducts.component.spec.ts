/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsersproductsComponent } from './usersproducts.component';

describe('UsersproductsComponent', () => {
  let component: UsersproductsComponent;
  let fixture: ComponentFixture<UsersproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
