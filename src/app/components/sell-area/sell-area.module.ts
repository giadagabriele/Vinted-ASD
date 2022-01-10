import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateProductComponent, EditProductComponent, ListProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SellAreaModule { }
