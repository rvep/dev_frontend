import { Injectable, EventEmitter } from '@angular/core';

import { SidebarActivity } from './sidebaractivity.service';

@Injectable()
export class ContentSwap {

  public emitter$:EventEmitter<String>;

  constructor(private _sidebarActivityService:SidebarActivity) {
    this.emitter$ = new EventEmitter<String>();
  }

  public swap(content:String) {
    // set active menu item
    this._sidebarActivityService.setActive(content);
    // toggle sidebar if it's displayed
    if (jQuery('.sidebar').css('display') == 'block') {
      this._sidebarActivityService.toggleSideBar();
    }
    // push new state
    this.pushState(content);

  }
  private pushState(content:String) {
    this.emitter$.emit(content);
  }

}
