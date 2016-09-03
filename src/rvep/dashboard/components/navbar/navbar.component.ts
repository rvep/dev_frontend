import { Component } from '@angular/core';

import { ContentSwap, SidebarActivity } from '../../shared';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.scss']
})
export class Navbar {

  constructor (private _contentSwapService:ContentSwap,
               private _sidebarActivityService:SidebarActivity) {}

  private contentSwap(content:String) {
    // swap content
    this._contentSwapService.swap(content);
  }

  private toggleSideBar() {
    this._sidebarActivityService.toggleSideBar();
  }

}
