import { PersonalizationGuard } from './guard/Personalization.guard';
import { AdminGuard } from './guard/admin.guard';
import { ProductModelServer } from './models/product.model';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './components/product/product.component';
import {CartComponent} from './components/cart/cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ThankyouComponent} from './components/thankyou/thankyou.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileGuard} from './guard/profile.guard';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {HomeLayoutComponent} from './components/home-layout/home-layout.component';
import {ContactComponent} from './components/contact/contact.component';
import { ClothesComponent} from './components/clothes/clothes.component';
import { ShoesComponent } from './components/shoes/shoes.component';
import { AccessoriesComponent } from './components/accessories/accessories.component';
import { CookComponent } from './components/cook/cook.component';
import { TechnologyComponent } from './components/technology/technology.component';
import { BookComponent } from './components/book/book.component';
import { PersonalizationComponent } from './components/personalization/personalization.component';
import { CreateProductComponent } from './components/sell-area/create-product/create-product.component';
import { EditProductComponent } from './components/sell-area/edit-product/edit-product.component';
import { MessageComponent } from './components/message/message.component';
import { PurchaseComponent } from './components/purchase/purchase.component';

const routes: Routes = [
  // Define routes for the landing / home page, create a separate component for the layout of home page
  // put only header, footer and router-outlet there
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '', component: HomeComponent
        , canActivate: [ProfileGuard, PersonalizationGuard]

      },
      {
        path: 'product/:id', component: ProductComponent,
        canActivate: [ProfileGuard, PersonalizationGuard]
      },
      {
        path: 'cart', component: CartComponent,
        canActivate: [ProfileGuard, PersonalizationGuard]
      },
      {
        path: 'checkout', component: CheckoutComponent
        , canActivate: [ProfileGuard]
      },
      {
        path: 'thankyou', component: ThankyouComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'profile', component: ProfileComponent
        , canActivate: [ProfileGuard, PersonalizationGuard]
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'personalization', component: PersonalizationComponent,
        canActivate: [ProfileGuard]
      },
      {
        path: 'contact', component: ContactComponent,
        canActivate: [ProfileGuard, PersonalizationGuard]
      },
      {
        path: 'clothes' , component: ClothesComponent,
        canActivate: [ProfileGuard, PersonalizationGuard]
      },
      {
        path: 'shoes' , component: ShoesComponent
      },
      {
        path: 'accessories', component: AccessoriesComponent
      },
      {
        path: 'cook' , component: CookComponent
      },
      {
        path: 'technology' , component: TechnologyComponent
      },
      {
        path: 'book' , component: BookComponent
      },
      {
        path: 'product', component: ProductComponent
      },
      {
        path: 'create-product', component: CreateProductComponent
      },
      {
        path: 'edit-product', component: EditProductComponent
      },
      {
        path: 'message', component: MessageComponent
      },
      {
        path: 'purchase', component: PurchaseComponent
      }

    ]
  },
  // Wildcard Route if no route is found == 404 NOTFOUND page
   // Wildcard Route if no route is found == 404 NOTFOUND page
   { path: 'myprofile', loadChildren: () => import('./components/profile/profile/profile.module').then(m => m.ProfileModule) },

  // { path: 'myprofile', loadChildren: () => import(`./profile/profile.module`).then(m => m.ProfileModule)
   {
    path: '**', pathMatch: 'full', redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
