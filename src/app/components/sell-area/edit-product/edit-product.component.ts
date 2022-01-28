import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '@app/components/product/product.component';
import { ProductService } from '@app/services/product.service';
import {ActivatedRoute} from '@angular/router';
import { Category } from '@app/models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private productSrv: ProductService,
              private route : ActivatedRoute) { }
  aaform: FormGroup;
  categories = ['clothes', 'shoes', 'accessories', 'cook', 'technology', 'books'];
  
  productForm = this.formBuilder.group({
    name: ['',[Validators.required,Validators.minLength(6)]],
    description: [''],
    size: [''],
    price:['',[Validators.required]],
    brand:['',[Validators.required]],
    color:[''],
    quantity:['1',[Validators.required]],
    category:['',[Validators.required]],
    photo:[''],
  });

  private product : Product;
  private prodId : number;
  private path : string;

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
          this.productForm.patchValue({
            name: response.name,
            description: response.description,
            size:response.size,
            price: response.price,
            brand: response.brand,
            color: response.color,
            category: response.category,
            //photo: response.photo
          });
          this.path = response.image;
          //console.log("form = ", this.productForm.value)
          console.log("Photo = " , this.path)
      }
      })
    });
  }
  
  submit(){
    let prod : Product = this.productForm.value;
    prod.id = this.prodId;
    //console.log("prod = ", prod);
    //console.log("form = ", this.productForm.value);
    //console.log("LENGTH",this.productForm.get('photo').value.length)
    if(this.productForm.get('photo').value.length!=0){
      prod.image = '/assets/img/' + this.productForm.get('photo').value.substring(12, this.productForm.get('photo').value.length);
      console.log("PATH",this.path);
      console.log("prod = ", prod);
    }
    else{
      console.log("PATH",this.path);
      prod.image = this.path;
    }
    //prod.userId = 
    this.productSrv.update(prod.id,prod).subscribe((response:any) => {
      if(response){
      //  this.route.navigate(['/listaprodotticaricati'])
    }
    })
    //console.log("product edited correctly")
    alert('product edited correctly :)')
  }


}
