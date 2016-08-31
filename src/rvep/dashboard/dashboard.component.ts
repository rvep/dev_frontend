import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { AuthService } from '../auth/service/auth.service';
import { AuthModel } from "../auth/model/auth.model";

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.scss'],
    directives: [CORE_DIRECTIVES]
})
export class Dashboard {

    private _authModel:AuthModel;

    // constructor
    constructor(private _authService:AuthService) {}

    // on-init
    ngOnInit() {
        // init vars
        this._authModel = {isAuthorized:this._authService.isUserAuthorized()};

        this._authService.emitter$.subscribe((isAuthorized) => {
          this._authModel.isAuthorized = isAuthorized;
        });
    }

    public signOut() {
      this._authService.signOut();
    }

    public hideSideBar() {
      jQuery('.sidebar')
        .stop()
        .animate({width: 'toggle'});
    }
}
