import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Logger } from 'angular2-logger/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AuthService } from '../../../signin';
import { AddEventModel } from '../models';

@Injectable()
export class AddEventService {

  constructor(private _logger:Logger,
              private _http:Http,
              private _authService:AuthService) {}

  public async addEvent(title:String, description:String, email:String):Promise<any> {
    // get request vars ready
    var headers = new Headers({
      'Content-Type':'application/json',
      'idToken':this._authService.getIdToken()
    });
    var body = JSON.stringify({'title':title, 'description':description, 'email':email});
    var url = 'http://localhost:8080/api/app/events/add/event';

    // make request, return result
    return await this._http.post(url, body, {headers: headers})
      .map((res:Response) => (res.json()))
      .do((data:AddEventModel) => {
        this._logger.info('added event? ' + data.isAdded);
      })
      .toPromise();
  }

}
