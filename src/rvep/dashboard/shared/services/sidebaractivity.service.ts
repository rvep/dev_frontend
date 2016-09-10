import { Injectable } from '@angular/core';

@Injectable()
export class SidebarActivity {

    private _active:String;

    constructor() {
      this._active = 'home';
    }

    public toggleSideBar() {
      $('.sidebar')
        .stop()
        .animate({width: 'toggle'});
    }

    public setActive(content:String) {
      // find li item with active class
      // remove active class
      $('li.active').removeClass('active');
      // set active
      $('#' + content).addClass('active');
      this._active = content;
    }

    public getActive():String {
      return this._active;
    }

}