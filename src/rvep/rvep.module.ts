import { NgModule, CUSTOM_ELEMENTS_SCHEMA, provide } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_PROVIDERS } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule, AuthMethods, AuthProviders, FIREBASE_PROVIDERS } from 'angularfire2';

import { rvepRouterProviders } from './rvep.routes';
import { Rvep } from './rvep.component';
import { Signin } from './signin/signin.component';
import { Dashboard } from './dashboard/dashboard.component';
import { AuthService } from './auth/service/auth.service';
import { GoogleAuthService } from './auth/service/googleauth.service';
import { VerifyAuthService } from './auth/service/verifyauth.service';

export const firebaseConfig = {
  apiKey: "AIzaSyC1aHWikGh18FBBwuVbSGuUu1lQvWCOUnY",
  authDomain: "rvep-1212.firebaseapp.com",
  databaseURL: "https://rvep-1212.firebaseio.com",
  storageBucket: "rvep-1212.appspot.com"
}

export const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
}

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule,
              AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)],
    declarations: [Rvep, Signin, Dashboard],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        FIREBASE_PROVIDERS,
        HTTP_PROVIDERS,
        rvepRouterProviders,
        provide(APP_BASE_HREF, {useValue: '/'}),
        provide(LocationStrategy, {useClass: HashLocationStrategy}),
        AuthService, GoogleAuthService, VerifyAuthService
    ],
    bootstrap: [Rvep]
})
export class RvepModule {}
