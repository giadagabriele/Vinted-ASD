import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '@app/components/product/product.component';
import { ProductService } from '@app/services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private productSrv: ProductService,
              private route : ActivatedRoute) { }
  aaform: FormGroup
   
  productForm = this.formBuilder.group({
    name: ['',[Validators.required,Validators.minLength(6)]],
    description: [''],
    size: ['',[Validators.required]],
    price:['',[Validators.required]],
    brand:['',[Validators.required]],
    color:['',[Validators.required]],
    quantity:['',[Validators.required]],
    category:['',[Validators.required]],
    photo:[''],
  });

  private product : Product;
  private prodId : number;

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      if(!paramMap.get('id')){
        //TODO: errore;
        alert('ID Not Found');
      }
      this.prodId = +paramMap.get('id');
      this.productSrv.getSingleProduct(this.prodId).subscribe((response:any) => {
        if(response){
        //  this.route.navigate(['/listaprodotticaricati'])
          console.log("product find correctly=", response)
          this.productForm = response;
          console.log("form = ", this.productForm.value)
      }
      })
    });
  }
  
  submit(){
    let prod : Product = this.productForm.value;
    prod.id = this.prodId;

    //prod.userId = 
    this.productSrv.update(prod.id,prod).subscribe((response:any) => {
      if(response){
      //  this.route.navigate(['/listaprodotticaricati'])
        console.log("product added correctly")
        alert('product added correctly :)')
    }
    })
  }


}
