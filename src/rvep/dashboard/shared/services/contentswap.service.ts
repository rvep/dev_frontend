import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ContentSwap {

  public emitter$:EventEmitter<String>;
  constructor() {
    this.emitter$ = new EventEmitter<String>();
  }

  public toggleSideBar() {
    jQuery('.sidebar')
      .stop()
      .animate({width: 'toggle'});
  }

  public swap(content:String) {
    this.pushState(content);
  }

  public setActive(content:String) {
    // find li item with active class
    // remove active class
    jQuery('li.active').removeClass('active');
    jQuery('#' + content).addClass('active');
  }

  private pushState(content:String) {
    this.emitter$.emit(content);
  }

}
