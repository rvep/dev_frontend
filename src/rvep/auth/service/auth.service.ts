import { Injectable, EventEmitter } from '@angular/core';

import { GoogleAuthService } from './googleauth.service';
import { VerifyAuthService } from './verifyauth.service';
import { AuthModel } from "../model/auth.model";

@Injectable()
export class AuthService {

    // vars
    public emitter$:EventEmitter<boolean>;
    private _authModel:AuthModel;

    // constructor
    constructor(private _glAuthService:GoogleAuthService,
                private _verifyAuthService:VerifyAuthService) {
        // init vars
        this.emitter$ = new EventEmitter<boolean>();
        this._authModel = {isAuthorized: false};

        // subscribe to auth verification emitter
        this._verifyAuthService.emitter$.subscribe((isVerified) => {
            // log
            console.log('verification state received: ' + isVerified);

            // auth check and push state
            this._authModel.isAuthorized = this.authCheck(isVerified);
            this.pushState();
        });
    }

    // auth check
    private authCheck(isVerified:boolean):boolean {
        // user is signed in && authorized
        if (this._glAuthService.isUserSignedIn() && isVerified) {
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
        this._glAuthService.signOut();
        // unverify
        this._verifyAuthService.unverify();
        // update auth state and push
        this._authModel.isAuthorized = false;
    }

    public signIn():void {
        // signin to google
        this._glAuthService.signIn();
    }

}
