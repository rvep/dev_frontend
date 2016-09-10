import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Logger } from 'angular2-logger/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AuthService } from '../../../signin';
import { FirebaseAuthService } from '../../../signin';
import { EventModel } from '../models';
import {EventItemModel} from "../models/eventItem.model";

@Injectable()
export class EventsService {

  constructor(private _http:Http,
              private _logger:Logger,
              private _authService:AuthService,
              private _fbAuthService:FirebaseAuthService) {}

  public async getEventItems(event:EventModel):Promise<any> {
    // init requst params
    var email = this._fbAuthService.getCurrentUser().email;
    // setup request
    var headers = new Headers({
      'Content-Type':'application/json',
      'idToken':this._authService.getIdToken()
    });
    var url = "http://localhost:8080/api/app/events/event/" + event.eventId + "/items/get/all?email=" + email;

    // make request
    return await this._http.get(url, {headers:headers})
      .map((res:Response) => (res.json()))
      .do((data:Array<EventItemModel>) => {
        this._logger.info('# of event items: ' + data.length);
      })
      .toPromise();
  }

  public async getEvents():Promise<any> {
    // init requst params
    var email = this._fbAuthService.getCurrentUser().email;
    // setup request
    var headers = new Headers({
      'Content-Type':'application/json',
      'idToken':this._authService.getIdToken()
    });
    var url = "http://localhost:8080/api/app/events/get/event/all?email=" + email;

    // make request
    return await this._http.get(url, {headers:headers})
      .map((res:Response) => (res.json()))
      .do((data:Array<EventModel>) => {
        this._logger.info('# of events: ' + data.length);
      })
      .toPromise();
  }

}