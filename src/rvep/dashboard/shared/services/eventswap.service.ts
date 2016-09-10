import { Injectable, EventEmitter } from '@angular/core';

import { EventModel } from '../models';

@Injectable()
export class EventSwapService {

  public emitter$:EventEmitter<EventModel>;

  constructor() {
    this.emitter$ = new EventEmitter<EventModel>();
  }

  public swap(event:EventModel) {
    this.pushState(event);
  }

  private pushState(event:EventModel) {
    this.emitter$.emit(event);
  }

}
