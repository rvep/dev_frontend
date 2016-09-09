import { Component, OnInit } from '@angular/core';

import { EventsService, EventModel } from '../../shared';

@Component({
  selector: 'events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.scss']
})
export class Events implements  OnInit {

  private _eventsModel:Array<EventModel>;

  constructor(private _eventsService:EventsService) {}

  ngOnInit() {
    this._eventsModel = new Array<EventModel>();
    this.getEvents();
  }

  private getEvents():void {
    this._eventsService.getEvents()
      .then((data:Array<EventModel>) => {
        this._eventsModel = data;
      });
  }

}
