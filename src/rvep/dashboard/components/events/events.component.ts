import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { EventsService, EventModel, EventSwapService } from '../../shared';

@Component({
  selector: 'events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Events implements  OnInit {

  private _eventsModel:Array<EventModel>;

  constructor(private _eventsService:EventsService,
              private _eventSwapService:EventSwapService) {}

  ngOnInit() {
    this._eventsModel = [];
    this.getEvents();
  }

  private getEvents():void {
    this._eventsService.getEvents()
      .then((data:Array<EventModel>) => {
        this._eventsModel = data;
      });
  }

  private openEvent(event:EventModel):void {
    // only toggle display if container is not open
    var display = jQuery('.open-event-container').css('display');
    if (display == 'none') {
      this.toggleEvent();
    }
    // swap event
    this._eventSwapService.swap(event);
  }

  private toggleEvent() {
    jQuery('.open-event-container')
      .stop()
      .animate({width: 'toggle'});
  }

}
