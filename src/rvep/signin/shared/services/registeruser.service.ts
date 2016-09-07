import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Logger } from 'angular2-logger/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { UserRegistrationModel } from '../models';

@Injectable()
export class RegisterUserService {

  private _userRegistrationModel:UserRegistrationModel;

  constructor(private _http:Http, private _logger:Logger) {
    this._userRegistrationModel = new UserRegistrationModel();
  }

  public async isUserRegisteredCheck(email:String, provider:String, idToken:String):Promise<any> {
    var headers = new Headers({
      'Content-Type':'application/json',
      'idToken':idToken
    });
    var url = 'http://localhost:8080/api/registration/is/user/registered';
    var body = JSON.stringify({'email':email, 'provider':provider});

    return await this._http.post(url, body, {headers: headers})
      .map((res:Response) => (res.json()))
      .do((data:UserRegistrationModel) => {
        this._logger.info('is user registered? ' + data.isRegistered);
        this._logger.info('rvep idToken: ' + data.idToken);
        this._userRegistrationModel.isRegistered = data.isRegistered;
      })
      .toPromise();
  }

  public async registerUser(email:String, provider:String, idToken:String):Promise<any> {
    var headers = new Headers({
      'Content-Type':'application/json',
      'idToken':idToken
    });
    var body = JSON.stringify({'email':email, 'provider':provider});
    var url = 'http://localhost:8080/api/registration/register/user';

    return await this._http.post(url, body, {headers: headers})
      .map((res:Response) => (res.json()))
      .do((data:UserRegistrationModel) => {
        this._logger.info('registered user? ' + data.isRegistered);
        this._logger.info('rvep idToken: ' + data.idToken);
        this._userRegistrationModel.isRegistered = data.isRegistered;
      })
      .toPromise();
  }

  public isUserRegistered():boolean {
    return this._userRegistrationModel.isRegistered;
  }
  
}