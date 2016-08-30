import { Component, NgZone } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

import { Auth } from '../auth/auth.component';

@Component({
    selector: 'signin',
    inputs: [],
    templateUrl: 'signin.component.html',
    styleUrls: ['signin.scss'],
    directives: [CORE_DIRECTIVES, Auth]
})
export class Signin {}
