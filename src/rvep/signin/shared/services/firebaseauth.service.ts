import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Logger } from 'angular2-logger/core';

import { FirebaseUser, FirebaseAuthModel } from '../models';
import { VerifyAuthService } from './verifyauth.service';

@Injectable()
export class FirebaseAuthService {
    // vars
    private _fbAuthModel:FirebaseAuthModel;
    private _fbUser:FirebaseUser;
    private _authFlag:boolean = true;

    // constructor
    constructor(private _verifyAuthService: VerifyAuthService,
                private _af: AngularFire,
                private _logger:Logger) {
        // init vars
        this._fbAuthModel = new FirebaseAuthModel();
        this._fbUser = new FirebaseUser();

        // subscribe to auth state
        this.firebaseAuthSubscribe();
    }

  // angularfire2 auth state subscribe
    private firebaseAuthSubscribe():void {
      this._af.auth.subscribe((auth:FirebaseAuthState) => {
        if(auth && this._authFlag) {
          // TODO:
          // this is a temporary fix for subscribe
          // being triggered twice
          this._authFlag = false;

          // set fb user
          this.setFBUser(auth);

          this._logger.info('user signed in');
          this._logger.info('name: ' + this._fbUser.name);

          // set auth state
          this._fbAuthModel.isSignedIn = true;
          // verify
          this._verifyAuthService.verify(auth);
        } else if(auth == null && !this._authFlag) {
          this._authFlag = true;
          this._logger.info('user signed out');
          this._fbAuthModel.isSignedIn = false;
        }
      });
    }

    // signout of google
    public signOut():void {
      this._af.auth.logout();
    }

    // signin
    public signIn():void {
      this._af.auth.login();
    }

    public getCurrentUser():FirebaseUser {
      return this._fbUser;
    }

    // check if user is signed in
    public isUserSignedIn():boolean {
        return this._fbAuthModel.isSignedIn;
    }

    // setup firebase user
    private setFBUser(auth:FirebaseAuthState) {
      // set fb user
      this._fbUser.uid = auth.auth.uid;
      this._fbUser.email = auth.auth.email;
      this._fbUser.name = auth.auth.displayName;
      this._fbUser.picture = auth.auth.photoURL;
      this._fbUser.provider = auth.auth.providerData[0].providerId;
    }

}
