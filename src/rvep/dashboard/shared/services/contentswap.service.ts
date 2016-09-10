import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ContentSwapService {

  public emitter$:EventEmitter<String>;

  constructor() {
    this.emitter$ = new EventEmitter<String>();
  }

  public swap(content:String) {
    this.pushState(content);
  }

  private pushState(content:String) {
    this.emitter$.emit(content);
  }

}
