import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserComponent } from './components/user/user.component';
import { PersonalizationComponent } from './components/personalization/personalization.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from '@app/app-routing.module';
import {AppComponent} from '@app/app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from '@app/components/header/header.component';
import {FooterComponent} from '@app/components/footer/footer.component';
import {CartComponent} from '@app/components/cart/cart.component';
import {CheckoutComponent} from '@app/components/checkout/checkout.component';
import {HomeComponent} from '@app/components/home/home.component';
import {ProductComponent} from '@app/components/product/product.component';
import {ThankyouComponent} from '@app/components/thankyou/thankyou.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from '@app/components/login/login.component';
import {ProfileComponent} from '@app/components/profile/profile.component';
import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';
import {RegisterComponent} from '@app/components/register/register.component';
import {HomeLayoutComponent} from '@app/components/home-layout/home-layout.component';
import {SellAreaModule} from './components/sell-area/sell-area.module';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import { MessageComponent } from './components/message/message.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { ModalComponent } from './components/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './components/card/card.component';
import { CategoryComponent } from './components/category/category.component';
import { CommonModule } from '@angular/common';
import { PaypalComponent } from './components/payment/paypal/paypal.component';
import { CreditCardPaymentComponent } from './components/payment/CreditCard/credit-card-payment/credit-card-payment.component';
import { SearchUsersComponent } from './components/search-users/search-users.component';
import { MyproductsComponent } from './components/myproducts/myproducts.component';
import { InoutComponent } from './components/message/inout/inout.component';
import { UsersproductsComponent } from './components/usersproducts/usersproducts.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { PaymenthistoryComponent } from './components/paymenthistory/paymenthistory.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('303960986715-qtdi8and1rpcerlaom82f56hp9a5g1t8.apps.googleusercontent.com')
  }

]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductComponent,
    ThankyouComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    HomeLayoutComponent,
    MessageComponent,
    PurchaseComponent,
    FavoriteComponent,
    ModalComponent,
    CardComponent,
    PersonalizationComponent,
    CategoryComponent,
    PaypalComponent,
    UserComponent,
    CreditCardPaymentComponent,
    SearchUsersComponent,
    MyproductsComponent,
    InoutComponent,
    UsersproductsComponent,
    SearchProductComponent,
    PaymenthistoryComponent
   ],
   entryComponents:[
    PaypalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule,
    SellAreaModule,
    TypeaheadModule.forRoot(),
    NgbModule,
    ReactiveFormsModule,
    CommonModule,
    Ng2SearchPipeModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }

  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
