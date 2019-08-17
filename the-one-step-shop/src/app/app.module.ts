import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './user/authentication/authentication.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MyMaterialModule } from './material-module';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LogoutComponent } from './user/logout/logout.component';
import { AuthTokenInterceptor } from './user/shared/token/token.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    RegistrationComponent,
    HomeComponent,
    MainpageComponent,
    LogoutComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MyMaterialModule,
    NgbModule,
  ],
  providers: [[{ provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }]],
  bootstrap: [AppComponent]
})
export class AppModule { }
