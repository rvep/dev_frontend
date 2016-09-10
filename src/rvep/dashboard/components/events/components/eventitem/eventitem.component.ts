import { Component, OnInit } from '@angular/core';

import { EventsService, EventSwapService, EventModel, EventItemModel } from '../../../../shared';

@Component({
  selector: 'eventitem',
  templateUrl: 'eventitem.component.html',
  styleUrls: ['eventitem.scss']
})
export class EventItem implements  OnInit {

  private _event:EventModel;
  private _eventItemsModel:Array<EventItemModel>;

  constructor(private _eventsService:EventsService,
              private _eventSwapService:EventSwapService) {}

  ngOnInit() {
    this._eventItemsModel = [];
    this._event = new EventModel();
    this._eventSwapService.emitter$.subscribe((event:EventModel) => {
      this._event = event;
      this.getEventItems(event);
    });
  }

  private getEventItems(event:EventModel):void {
    this._eventsService.getEventItems(event)
      .then((data:Array<EventItemModel>) => {
        this._eventItemsModel = data;
      });
  }

  private openEvent(event:EventModel):void {
    // only toggle display if container is not open
    var display = jQuery('.open-event-container').css('display');
    if (display == 'none') {
      this.toggleEvent();
    }
    // load new model
    this._event = event;
  }

  private toggleEvent() {
    jQuery('.open-event-container')
      .stop()
      .animate({width: 'toggle'});
  }

}
