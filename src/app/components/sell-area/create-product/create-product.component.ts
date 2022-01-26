import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '@app/components/product/product.component';
import { User } from '@app/models/user.model';
import { AuthenticationService } from '@app/services/authentication.service';
import { ProductService } from '@app/services/product.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
 myUser: User;
 categories = ['clothes', 'shoes', 'accessories', 'cook', 'technology', 'books'];
  constructor(private formBuilder: FormBuilder,
              private productSrv: ProductService,
              private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser
      .subscribe((data: User) => {
        this.myUser = data;
      });
    }

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    description: [''],
    size: ['', [Validators.required]],
    price: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    color: ['', [Validators.required]],
    quantity: ['1', [Validators.required]],
    category: ['', [Validators.required]],
    image: ['', [Validators.required]],
  });

  ngOnInit(): void {
  }

  submit() {
    const prod: Product = this.productForm.value;
    prod.image = '/assets/img/' + prod.image.substring(12, prod.image.length);
    prod.userId = this.myUser.id;
    this.productSrv.add(prod).subscribe((response: any) => {
      if (response) {
      //  this.route.navigate(['/listaprodotticaricati'])
        console.log('product added correctly');
        alert('product added correctly :)');
    }
    });
  }

}
