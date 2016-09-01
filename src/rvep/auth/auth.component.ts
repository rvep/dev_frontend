import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

import { FirebaseAuthService } from './service/firebaseauth.service';
import { AuthService } from './service/auth.service';
import { AuthModel } from './model/auth.model';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'auth',
    inputs: ['_authModel'],
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.scss'],
    directives: [CORE_DIRECTIVES]
})
export class Auth implements OnInit, OnDestroy {

    // vars
    private _authModel:AuthModel;
    private _authSubscription;

    // constructor
    constructor(private _af:AngularFire, private _authService:AuthService,
                private _ngZone:NgZone, private _router:Router) {
        // init vars
        this._authModel = {isAuthorized:this._authService.isUserAuthorized()};

        // subscribe to auth state
        this._authSubscription = this._authService.emitter$
            .subscribe((isAuthorized) => {
                this._ngZone.run(() => {
                    // log
                    console.log('auth state received: ' + isAuthorized);
                    this.processAuthChange(isAuthorized);
                })
            });
    }

    // on-init
    ngOnInit() {
      this.navigate();
    }

    // on-destroy
    ngOnDestroy() {
        // unsubscribe from auth
        this._authSubscription.unsubscribe();
    }

    public signIn(provider:string):void {
      this._authService.signIn();
    }

    public signOut(provider:string):void {
      this._authService.signOut();
    }

    // process auth changes
    private processAuthChange(isAuthorized:boolean):void {
        // update model
        this._authModel.isAuthorized = isAuthorized;
        // navigate
        this.navigate();
    }

    // navigate based on auth
    private navigate() {
      // if user is authorized, navigate to dashboard
      if (this._authModel.isAuthorized) {
          // check if already on dashboard page
          //if (!this._router.isActive('dashboard', true)) {
            this._router.navigate(['dashboard']);
          //}
      } else {
          // check if already on signin page
          //if (!this._router.isActive('', true)) {
              // otherwise redirect to signin page
              this._router.navigate(['']);
          //}
      }
    }
}
