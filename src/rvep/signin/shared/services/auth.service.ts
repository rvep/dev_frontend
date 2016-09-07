import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from 'angular2-logger/core';

import { FirebaseAuthService } from './firebaseauth.service';
import { VerifyAuthService } from './verifyauth.service';
import { RegisterUserService } from './registeruser.service';
import { AuthModel, IsUserRegisteredModel, RegisterUserModel } from "../models";

@Injectable()
export class AuthService {

    // vars
    public emitter$:EventEmitter<boolean>;
    private _authModel:AuthModel;

    // constructor
    constructor(private _fbAuthService:FirebaseAuthService,
                private _verifyAuthService:VerifyAuthService,
                private _registerUserService:RegisterUserService,
                private _router:Router,
                private _logger:Logger) {
      // init vars
      this.emitter$ = new EventEmitter<boolean>();
      this._authModel = new AuthModel();

      // subscribe to auth verification emitter
      this.verificationStateSubscribe();
    }

    private registerUser() {
      // get vars
      var email = this._fbAuthService.getCurrentUser().email;
      var provider = this._fbAuthService.getCurrentUser().provider;

        this._registerUserService.registerUser(email, provider)
          .then((registeredUser:RegisterUserModel) => {
            // if the user is successfully registered
            // proceed with authorization
            if (registeredUser.userRegistered) {
              this.authCheckAndPushState();
            }
          });
    }

    private authCheckAndPushState():void {
      // auth check and push state
      this._authModel.isAuthorized = this.authCheck();
      this.pushState();

      if (this.isUserAuthorized()) {
        // navigate
        this.navigate();
      }
    }

    // auth check
    private authCheck():boolean {
        // user is signed in && authorized
        if (this._fbAuthService.isUserSignedIn() &&
            this._verifyAuthService.isUserVerified() &&
            this._registerUserService.isUserRegistered()) {
          return true;
        }

        return false;
    }

    // push state
    public pushState():void {
        this.emitter$.emit(this._authModel.isAuthorized);
    }

    // return if user is authorized
    public isUserAuthorized():boolean {
        return this._authModel.isAuthorized;
    }

    // sign user out
    public signOut():void {
        // signout of google
        this._fbAuthService.signOut();
        // unverify
        this._verifyAuthService.unverify();
        // update auth state and push
        this._authModel.isAuthorized = false;
        // push state
        this.pushState();
        // navigate
        this.navigate();
    }

    public signIn():void {
        // signin to google
        this._fbAuthService.signIn();
    }

    // navigate based on auth
    public navigate() {
      // if user is authorized, navigate to dashboard
      if (this._authModel.isAuthorized) {
          // check if already on dashboard page
          if (!this._router.isActive('dashboard', true)) {
            this._router.navigate(['dashboard']);
          }
      } else {
          // check if already on signin page
          if (!this._router.isActive('', true)) {
              // otherwise redirect to signin page
              this._router.navigate(['']);
          }
      }
    }

    // subscribe to verification state
    private verificationStateSubscribe():void {
      this._verifyAuthService.emitter$.subscribe((isVerified) => {
        // log
        this._logger.info('verification state received: ' + isVerified);
        // get vars
        var email = this._fbAuthService.getCurrentUser().email;

        // check if user is registered
        this._registerUserService.isUserRegisteredCheck(email)
          .then((isUserRegistered: IsUserRegisteredModel) => {
            // if user is not registered, register the user
            if (!isUserRegistered.isRegistered) {
              this.registerUser();
            } else {
              this.authCheckAndPushState();
            }
          });
      });
    }

}
