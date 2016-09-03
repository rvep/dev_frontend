import { Injectable } from '@angular/core';

@Injectable()
export class SidebarActivity {

    public toggleSideBar() {
      jQuery('.sidebar')
        .stop()
        .animate({width: 'toggle'});
    }

    public setActive(content:String) {
      // find li item with active class
      // remove active class
      jQuery('li.active').removeClass('active');
      jQuery('#' + content).addClass('active');
    }

}