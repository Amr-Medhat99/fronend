import { UsersService } from './services/users.service';
import { InterceptorTokenService } from './interceptor-token.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { ShopComponent } from './shop/shop.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoaderComponent } from './loader/loader.component';
import { SearchComponent } from './search/search.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminBrandsComponent } from './admin-brands/admin-brands.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ProductComponent,
    CheckoutComponent,
    CartComponent,
    ShopComponent,
    NavbarComponent,
    ConfirmEmailComponent,
    AdminDashboardComponent,
    LoaderComponent,
    SearchComponent,
    OrdersComponent,
    AdminNavbarComponent,
    AdminFooterComponent,
    AdminBrandsComponent,
    AdminCategoryComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
  ],
  providers: [AuthGuard, UsersService,{
    provide : HTTP_INTERCEPTORS,
    useClass: InterceptorTokenService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
