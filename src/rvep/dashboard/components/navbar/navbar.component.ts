import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.scss']
})
export class Navbar {

  private toggleSideBar() {
    jQuery('.sidebar')
      .stop()
      .animate({width: 'toggle'});
  }

}
