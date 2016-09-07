import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from 'angular2-logger/core';

import { FirebaseAuthService } from './firebaseauth.service';
import { VerifyAuthService } from './verifyauth.service';
import { RegisterUserService } from './registeruser.service';
import { AuthModel, VerifyAuthModel, UserRegistrationModel } from "../models";

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

  // subscribe to verification state
  private verificationStateSubscribe():void {
    this._verifyAuthService.emitter$.subscribe((verificationState:VerifyAuthModel) => {
      // log
      this._logger.info('verification state received: ' + verificationState.isVerified);
      // get vars
      var email = this._fbAuthService.getCurrentUser().email;
      var provider = this._fbAuthService.getCurrentUser().provider;

      // if verified
      if (verificationState.isVerified) {
        // set firebase idtoken
        this._authModel.firebaseIdToken = verificationState.firebaseIdToken;
        // check if user is registered
        this._registerUserService.isUserRegisteredCheck(email, provider, this._authModel.firebaseIdToken)
          .then((userRegistration:UserRegistrationModel) => {
            // set id token
            this._authModel.idToken = userRegistration.idToken;
            // if user is not registered, register the user
            if (!userRegistration.isRegistered) {
              this.registerUser();
            } else {
              this.authCheckAndPushState();
            }
          });
      }
    });
  }

  // register user
  private registerUser() {
    // get vars
    var email = this._fbAuthService.getCurrentUser().email;
    var provider = this._fbAuthService.getCurrentUser().provider;

    this._registerUserService.registerUser(email, provider, this._authModel.firebaseIdToken)
      .then((userRegistration:UserRegistrationModel) => {
        // set id token
        this._authModel.idToken = userRegistration.idToken;
        // if the user is successfully registered
        // proceed with authorization
        if (userRegistration.isRegistered) {
          this.authCheckAndPushState();
        }
      });
  }

  // auth check and push state
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

  // get idToken
  public getIdToken():String {
    return this._authModel.idToken;
  }

  // get auth model
  public getAuthModel():AuthModel {
    return this._authModel;
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

}
