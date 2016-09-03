import { Component, OnInit } from '@angular/core';

import { AuthService } from './shared';

@Component({
  selector: 'signin',
  inputs: [],
  templateUrl: 'signin.component.html',
  styleUrls: ['signin.scss']
})
export class Signin implements OnInit {

  constructor(private _authService:AuthService) {}

  ngOnInit() {
    // navigate if neccessary
    this._authService.navigate();
  }

}
