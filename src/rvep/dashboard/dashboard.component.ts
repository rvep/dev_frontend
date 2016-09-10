import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthService, AuthModel } from '../signin';
import { ContentSwapService, SidebarActivity } from './shared';

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
                private _contentSwapService:ContentSwapService,
                private _sidebarActivityService:SidebarActivity) {}

    // on-init
    ngOnInit() {
      // navigate if not authorized
      this._authService.navigate();
      // init vars
      this._authModel = this._authService.getAuthModel();

      this._content = 'home';

      // subscribe to content swap
      this._contentSwapService.emitter$.subscribe((content) => {
        // set new content state
        this._content = content;

        // only swap for changes
        if (this._sidebarActivityService.getActive() != content) {
          // set active menu item
          this._sidebarActivityService.setActive(content);
          // toggle sidebar if it's displayed
          if (jQuery('.sidebar').css('display') == 'block') {
            this._sidebarActivityService.toggleSideBar();
          }
        }
      });
    }

}
