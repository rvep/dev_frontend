import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'rvep',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['rvep.scss'],
    encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES]
})
export class Rvep {
    name = 'rvep';
}
