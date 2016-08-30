import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FirebaseAuthState } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import {VerifyAuthModel} from '../model/verifyauth.model.ts';

@Injectable()
export class VerifyAuthService {
    // vars
    public emitter$:EventEmitter<boolean>;
    private _verifyAuthModel:VerifyAuthModel;

    // constructor
    constructor(private _http:Http) {
        // init vars
        this.emitter$ = new EventEmitter<boolean>();
        this._verifyAuthModel = {isVerified: false};
    }

    // push state
    private pushState() {
        this.emitter$.emit(this._verifyAuthModel.isVerified);
    }

    // verify
    public async verify(authState:FirebaseAuthState) {//GoogleUser) {
        // init request params
        var tokenId:string = "";
        await authState.auth.getToken(true).then(token => {tokenId = token});
        var headers = new Headers({'Content-Type': 'application/json'});
        var body = JSON.stringify({'tokenId': tokenId});
        var url = 'http://localhost:8080/api/firebase/auth/verify';
        // first _http post request
        this._http.post(url, body, {headers: headers})
        // map response to json
            .map((res:Response) => res.json())
            // log
            .do((data) => console.log(data))
            // process response
            .subscribe(
                (authVerification) => {
                    console.log('is user verified? ' + authVerification.isVerified);
                    this._verifyAuthModel.isVerified = authVerification.isVerified;
                    this.pushState();
                },
                (err) => console.log(err),
                () => console.log('auth verification complete')
            );
    }

    // unverify
    public unverify():void {
        this._verifyAuthModel.isVerified = false;
    }

    // get isVerified
    public isUserVerified():boolean {
        return this._verifyAuthModel.isVerified;
    }
}
