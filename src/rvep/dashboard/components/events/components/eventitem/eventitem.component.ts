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

      if (!this.isEventOpen()) {
        this.toggleEvent();
      } else {
        var container = $('.open-event-container');
        container.css('opacity', 0);
        container.animate({opacity: 1}, {queue: false, duration: 'slow'});
      }

    });
  }

  private getEventItems(event:EventModel):void {
    this._eventsService.getEventItems(event)
      .then((data:Array<EventItemModel>) => {
        this._eventItemsModel = data;
      });
  }

  private toggleEvent() {
    var container = $('.open-event-container');

    if (this.isEventOpen()) {
      container.stop()
        .animate({opacity: 0}, {queue: false, duration: 'slow'});
    } else {
      container.stop()
        .animate({opacity: 1}, {queue: false, duration: 'slow'});
    }

    container
      .animate({width: 'toggle'}, 'slow');
  }

  private isEventOpen():boolean {
    var display = $('.open-event-container').css('display');
    return display != 'none';
  }

}
