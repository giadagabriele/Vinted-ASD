import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '@app/components/product/product.component';
import { ProductService } from '@app/services/product.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private productSrv: ProductService) { }
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

  ngOnInit(): void {
  }
  
  submit(){
    let prod : Product = this.productForm.value;
    //prod.userId = 
    this.productSrv.add(prod).subscribe((response:any) => {
      if(response){
      //  this.route.navigate(['/listaprodotticaricati'])
        console.log("product added correctly")
        alert('product added correctly :)')
    }
    })
  }

}