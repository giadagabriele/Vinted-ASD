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
import { CategoryComponent } from './components/category/category.component';
import { AccessoriesComponent } from './components/accessories/accessories.component';
import { CookComponent } from './components/cook/cook.component';
import { TechnologyComponent } from './components/technology/technology.component';
import { BookComponent } from './components/book/book.component';
import { PersonalizationComponent } from './components/personalization/personalization.component';
import { CreateProductComponent } from './components/sell-area/create-product/create-product.component';
import { EditProductComponent } from './components/sell-area/edit-product/edit-product.component';
import { MessageComponent } from './components/message/message.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { CardComponent } from './components/card/card.component';
import { SummaryComponent } from './components/summary/summary.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  // Define routes for the landing / home page, create a separate component for the layout of home page
  // put only header, footer and router-outlet there
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '', component: HomeComponent

      },
      {
        path: 'product/:id', component: ProductComponent,
        canActivate: [ProfileGuard, PersonalizationGuard]
      },
      {
        path: 'cart', component: CartComponent
        , canActivate: [ProfileGuard, PersonalizationGuard]
      },
      {
        path: 'checkout', component: CheckoutComponent
        , canActivate: [ProfileGuard, PersonalizationGuard]
      },
      {
        path: 'thankyou', component: ThankyouComponent
        , canActivate: [ProfileGuard, PersonalizationGuard]
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
        path: 'contact', component: ContactComponent
      },
      {
        path: 'clothes' , component: ClothesComponent
      },
      {
        path: 'shoes' , component: CategoryComponent
      },
      {
        path: 'accessories', component: CategoryComponent
      },
      {
        path: 'cook' , component: CategoryComponent
      },
      {
        path: 'technology' , component: CategoryComponent
      },
      {
        path: 'book' , component: CategoryComponent
      },
      {
        path: 'product', component: ProductComponent,
        canActivate: [ProfileGuard, PersonalizationGuard]
      },
      {
        path: 'favorite', component: FavoriteComponent,
        canActivate: [ProfileGuard]
      },
      {
        path: 'create-product', component: CreateProductComponent
        , canActivate: [ProfileGuard, PersonalizationGuard]
      },
      {
        path: 'edit-product', component: EditProductComponent
        , canActivate: [ProfileGuard, PersonalizationGuard]
      },
      {
        path: 'message', component: MessageComponent,
        canActivate: [ProfileGuard, PersonalizationGuard]
      },
      {
        path: 'purchase/:id', component: PurchaseComponent}, 
      {
        path: 'addCard', component: CardComponent
        , canActivate: [ProfileGuard, PersonalizationGuard]
      },
      {
        path: 'summary', component: SummaryComponent
        , canActivate: [ProfileGuard, PersonalizationGuard]
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
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
