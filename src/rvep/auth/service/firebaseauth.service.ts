import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { FirebaseAuthModel } from '../model/firebaseauth.model';
import { VerifyAuthService } from './verifyauth.service';

@Injectable()
export class FirebaseAuthService {
    // vars
    public emitter$:EventEmitter<boolean>;
    private _fbAuthModel:FirebaseAuthModel;

    // constructor
    constructor(private _verifyAuthService: VerifyAuthService,
                private _af: AngularFire) {
        // init var
        this.emitter$ = new EventEmitter<boolean>();
        this._fbAuthModel = {isSignedIn: false};

        // subscribe to firebase auth
        this._af.auth.subscribe((auth) => {
          if(auth) {
            console.log('user signed in');
            this._fbAuthModel.isSignedIn = true;
            // verify
            this._verifyAuthService.verify(auth);
            // push state
            this.pushState();
          } else {
            console.log('user signed out');
            this._fbAuthModel.isSignedIn = false;
            // push state
            this.pushState();
          }
        });
    }

    // push state
    private pushState():void {
        this.emitter$.emit(this._fbAuthModel.isSignedIn);
    }

    // signout of google
    public signOut():void {
      this._af.auth.logout();
    }

    // signin
    public signIn():void {
      this._af.auth.login();
    }

    // check if user is signed in
    public isUserSignedIn():boolean {
        return this._fbAuthModel.isSignedIn;
    }

}
