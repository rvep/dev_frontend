import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

import { AuthService } from '../auth/services/auth.service';
import { FirebaseAuthService } from '../auth/services/firebaseauth.service';
import { ContentSwap } from './services/contentswap.service';
import { AuthModel } from '../auth/models/auth.model';
import { FirebaseUser } from '../auth/models/firebaseuser.model';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.scss'],
    encapsulation: ViewEncapsulation.None,
    directives: [CORE_DIRECTIVES]
})
export class Dashboard implements OnInit {

    private _authModel:AuthModel;
    private _fbUser:FirebaseUser;
    private _content:String;

    // constructor
    constructor(private _authService:AuthService,
                private _contentSwapService:ContentSwap) {}

    // on-init
    ngOnInit() {
        // navigate if not authorized
        this._authService.navigate();
        // init vars
        this._authModel = {isAuthorized:this._authService.isUserAuthorized()};
        this._content = 'home';

        // subscribe to content swap
        this._contentSwapService.emitter$.subscribe((content) => {
          this._content = content;
        });
    }

}
