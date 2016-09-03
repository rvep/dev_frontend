import { Component, OnInit, AfterViewInit } from '@angular/core';

import { AuthService, FirebaseAuthService, FirebaseUser } from '../../../signin';
import { ContentSwap } from '../../';

@Component({
  selector: 'sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.scss']
})
export class Sidebar implements OnInit, AfterViewInit {
  private _fbUser:FirebaseUser;

  // constructor
  constructor(private _authService:AuthService,
              private _fbAuthService:FirebaseAuthService,
              private _contentSwapService:ContentSwap) {}

  // on-init
  ngOnInit() {
      // init vars
      this._fbUser = new FirebaseUser();
  }

  // view init
  ngAfterViewInit() {
    this._fbUser = this._fbAuthService.getCurrentUser();
  }

  private signOut() {
    this._authService.signOut();
  }

  private contentSwap(content:String) {
    // set active menu item
    this._contentSwapService.setActive(content);
    // swap content
    this._contentSwapService.swap(content);
    this._contentSwapService.toggleSideBar();
  }
}
