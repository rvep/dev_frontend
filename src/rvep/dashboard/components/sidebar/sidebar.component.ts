import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

import { FirebaseAuthService } from '../../../auth/services/firebaseauth.service';
import { FirebaseUser } from '../../../auth/models/firebaseuser.model';

@Component({
  selector: 'sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.scss'],
  directives: [CORE_DIRECTIVES]
})
export class Sidebar {
  private _fbUser:FirebaseUser;

  // constructor
  constructor(private _fbAuthService:FirebaseAuthService) {}

  // on-init
  ngOnInit() {
      // init vars
      this._fbUser = new FirebaseUser();
  }

  // view init
  ngAfterViewInit() {
    this._fbUser = this._fbAuthService.getCurrentUser();
  }
}
