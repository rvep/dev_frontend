import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Logger } from 'angular2-logger/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { RegisteredUserModel } from '../models';

@Injectable()
export class RegisterUserService {

  private _registeredUserModel:RegisteredUserModel;

  constructor(private _http:Http,
              private _logger:Logger) {
    this._registeredUserModel = new RegisteredUserModel();
  }

  public async isUserRegistered(email:String):Promise<any> {
    var headers = new Headers({"Content-Type":"application/json"});
    var url = "http://localhost:8080/api/registration/is/user/registered";
    url += "?email=" + email;

    return await this._http.get(url, {headers: headers})
      .map((res:Response) => (res.json()))
      .do((data:RegisteredUserModel) => {
        this._logger.info(data)
        this._registeredUserModel.isRegistered = data.isRegistered;
      })
      .toPromise();
  }

  public registerUser(email:String, provider:String):boolean {
    var headers = new Headers({"Content-Type":"application/json"});
    var body = JSON.stringify({"email":email, "provider":provider});
    var url = "http://localhost:8080/api/registration/register/user";

    this._http.post(url, body, {headers: headers})
      .map((res:Response) => (res.json()))
      .do((data) => {this._logger.info(data)})
        .subscribe((data:RegisteredUserModel) => {
            this._logger.info("registered user? " + data.isRegistered);
            this._registeredUserModel.isRegistered = data.isRegistered;
          },
          (err) => { this._logger.error(err); },
          () => { this._logger.info("user registration complete"); }
        );

    return this._registeredUserModel.isRegistered;
  }

}