import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'rvep',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['rvep.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Rvep {
    name = 'rvep';
}
