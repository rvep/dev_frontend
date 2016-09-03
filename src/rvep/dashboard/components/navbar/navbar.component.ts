import { Component } from '@angular/core';

import { ContentSwap } from '../../shared';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.scss']
})
export class Navbar {

  constructor (private _contentSwapService:ContentSwap) {}

  private contentSwap(content:String) {
    // set active menu item
    this._contentSwapService.setActive(content);
    // swap content
    this._contentSwapService.swap(content);
    // don't toggle sidebar if it's already off
    if (jQuery('.sidebar').css('display') == 'block') {
      this.toggleSideBar();
    }
  }

  private toggleSideBar() {
    this._contentSwapService.toggleSideBar();
  }

}
