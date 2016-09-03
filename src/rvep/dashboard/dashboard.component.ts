import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthService } from '../signin/components/auth/services/auth.service';
import { ContentSwap } from './shared/services/contentswap.service';
import { AuthModel } from '../signin/components/auth/models/auth.model';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Dashboard implements OnInit {

    private _authModel:AuthModel;
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
