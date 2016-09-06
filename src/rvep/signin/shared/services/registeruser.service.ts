import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Logger } from 'angular2-logger/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class RegisterUserService {

  constructor(private _http:Http,
              private _logger:Logger) {}

  public isUserRegistered(email:String):boolean {
    var isUserRegistered:boolean = false;
    var headers = new Headers({"Content-Type":"application/json"});
    var url = "http://localhost:8080/api/registration/is/user/registered";
    url += "?email=" + email;

    this._http.get(url, {headers: headers})
      .map((res:Response) => (res.json()))
      .do((data) => (this._logger.info(data)))
      .subscribe((registrationCheck) => {
          this._logger.info("is user registered? " + registrationCheck.isRegistered);
          isUserRegistered = registrationCheck.isRegistered;
        },
        (err) => { this._logger.error(err);},
        () => {this._logger.info("user regsitration check complete");}
      );

    return isUserRegistered;
  }

}