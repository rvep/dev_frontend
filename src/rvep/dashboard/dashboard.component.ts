import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';


import { AuthService } from '../auth/service/auth.service';
import { FirebaseAuthService } from '../auth/service/firebaseauth.service';
import { AuthModel } from '../auth/model/auth.model';
import { FirebaseUser } from '../auth/model/firebaseuser.model';
import { Navbar } from './components/navbar/navbar.component';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.scss'],
    encapsulation: ViewEncapsulation.None,
    directives: [CORE_DIRECTIVES, Navbar]
})
export class Dashboard implements OnInit, AfterViewInit {

    private _authModel:AuthModel;
    private _fbUser:FirebaseUser;

    // constructor
    constructor(private _authService:AuthService,
                private _fbAuthService:FirebaseAuthService) {}

    // on-init
    ngOnInit() {
        // navigate if not authorized
        this._authService.navigate();
        // init vars
        this._authModel = {isAuthorized:this._authService.isUserAuthorized()};
        this._fbUser = new FirebaseUser();
    }

    // view init
    ngAfterViewInit() {
      this._fbUser = this._fbAuthService.getCurrentUser();
    }

    public signOut() {
      this._authService.signOut();
    }
}
