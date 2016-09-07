import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {Signin, Auth, AuthService, RegisterUserService,
        FirebaseAuthService, VerifyAuthService } from './';

@NgModule({
  declarations: [Signin, Auth],
  imports: [BrowserModule],
  providers: [AuthService, RegisterUserService, VerifyAuthService, FirebaseAuthService]
})
export class SigninModule {}