import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FirebaseAuthState } from 'angularfire2';
import { Logger } from 'angular2-logger/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { VerifyAuthModel } from '../models';

@Injectable()
export class VerifyAuthService {
    // vars
    public emitter$:EventEmitter<boolean>;
    private _verifyAuthModel:VerifyAuthModel;

    // constructor
    constructor(private _http:Http,
                private _logger:Logger) {
        // init vars
        this.emitter$ = new EventEmitter<boolean>();
        this._verifyAuthModel = new VerifyAuthModel();
    }

    // push state
    private pushState() {
        this.emitter$.emit(this._verifyAuthModel.isVerified);
    }

    // verify
    public async verify(authState: FirebaseAuthState) {
        // init request params
        var idToken:string = "";
        await authState.auth.getToken(true).then(token => {idToken = token});
        var headers = new Headers({'Content-Type': 'application/json'});
        var body = JSON.stringify({'idToken': idToken});
        var url = 'http://localhost:8080/api/auth/firebase/verify';
        // first http post request
        await this._http.post(url, body, {headers: headers})
        // map response to json
            .map((res:Response) => res.json())
            // log
            .do((data) => this._logger.info('is user verified? ' + data.isVerified))
            // process response
            .subscribe(
                (authVerification) => {
                    this._verifyAuthModel.isVerified = authVerification.isVerified;
                    this.pushState();
                },
                (err) => this._logger.error(err),
                () => this._logger.info('auth verification complete')
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
