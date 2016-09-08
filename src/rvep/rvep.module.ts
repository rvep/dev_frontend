import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule, AuthMethods, AuthProviders, FIREBASE_PROVIDERS } from 'angularfire2';
import { Logger, Options, Level } from 'angular2-logger/core';

import { rvepRouterProviders, routing } from './rvep.routing';
import { Rvep } from './rvep.component';
import { DashboardModule } from './dashboard';
import { SigninModule } from './signin';

export const firebaseConfig = {
  apiKey: "AIzaSyDuRDCqn1ITVy_5gbg6ABnC2xxOR0I1grY",
  authDomain: "rvep-dev.firebaseapp.com",
  databaseURL: "https://rvep-dev.firebaseio.comm",
  storageBucket: "rvep-dev.appspot.com"
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

@NgModule({
    declarations: [Rvep],
    imports: [BrowserModule,
              FormsModule,
              ReactiveFormsModule,
              HttpModule,
              AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
              routing,
              DashboardModule,
              SigninModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        FIREBASE_PROVIDERS,
        rvepRouterProviders,
        [{provide: APP_BASE_HREF, useValue: '/'}],
        [{provide: LocationStrategy, useClass: HashLocationStrategy}],
        [{provide: Options, useValue: { level: Level.INFO }}],
        Logger
    ],
    bootstrap: [Rvep]
})
export class RvepModule {}
