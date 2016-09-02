import { Component } from '@angular/core';

import { AuthService } from '../../../signin/components/auth/services/auth.service';
import { FirebaseAuthService } from '../../../signin/components/auth/services/firebaseauth.service';
import { FirebaseUser } from '../../../signin/components/auth/models/firebaseuser.model';
import { ContentSwap } from '../../services/contentswap.service';

@Component({
  selector: 'sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.scss']
})
export class Sidebar {
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
    this.setActive(content);
    // swap content
    this._contentSwapService.swap(content);
    this.toggleSideBar();
  }

  private setActive(content:String) {
    // find li item with active class
    // remove active class
    jQuery('li.active').removeClass('active');
    jQuery('#' + content).addClass('active');
  }

  private toggleSideBar() {
    jQuery('.sidebar')
      .stop()
      .animate({width: 'toggle'});
  }
}
