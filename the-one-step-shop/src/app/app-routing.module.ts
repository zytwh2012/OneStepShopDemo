import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './user/authentication/authentication.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LogoutComponent } from './user/logout/logout.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'signin', component: AuthenticationComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'signout', component: LogoutComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
