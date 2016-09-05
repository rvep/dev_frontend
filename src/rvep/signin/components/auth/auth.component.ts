import { Component, NgZone, OnDestroy } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Logger } from 'angular2-logger/core';

import { AuthService, AuthModel } from '../../';

@Component({
    selector: 'auth',
    inputs: ['_authModel'],
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.scss']
})
export class Auth implements OnDestroy {

    // vars
    private _authModel:AuthModel;
    private _authSubscription;

    // constructor
    constructor(private _af:AngularFire,
                private _authService:AuthService,
                private _ngZone:NgZone,
                private _logger:Logger) {
        // init vars
        this._authModel = {isAuthorized:this._authService.isUserAuthorized()};

        // subscribe to auth state
        this._authSubscription = this._authService.emitter$
            .subscribe((isAuthorized) => {
                this._ngZone.run(() => {
                    // log
                    this._logger.info('auth state received: ' + isAuthorized);
                    this.processAuthChange(isAuthorized);
                })
            });
    }

    // on-destroy
    ngOnDestroy() {
        // unsubscribe from auth
        this._authSubscription.unsubscribe();
    }

    private signIn(provider:string):void {
      this._authService.signIn();
    }

    private signOut(provider:string):void {
      this._authService.signOut();
    }

    // process auth changes
    private processAuthChange(isAuthorized:boolean):void {
        // update model
        this._authModel.isAuthorized = isAuthorized;
    }
}
