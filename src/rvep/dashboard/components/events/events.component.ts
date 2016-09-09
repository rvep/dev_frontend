import { Component, OnInit } from '@angular/core';

import { EventsService, EventModel } from '../../shared';

@Component({
  selector: 'events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.scss']
})
export class Events implements  OnInit {

  private _eventsModel:Array<EventModel>;
  private _openEvent:EventModel;

  constructor(private _eventsService:EventsService) {}

  ngOnInit() {
    this._eventsModel = new Array<EventModel>();
    this._openEvent = new EventModel();
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
    // load new model
    this._openEvent = event;
  }

  private toggleEvent() {
    jQuery('.open-event-container')
      .stop()
      .animate({width: 'toggle'});
  }

}
