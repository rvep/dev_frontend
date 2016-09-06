import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Logger } from 'angular2-logger/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class RegisterUserService {

  constructor(private _http:Http,
              private _logger:Logger) {}

  public async isUserRegistered(email:String):Promise<any> {
    var isUserRegistered:boolean = false;
    var headers = new Headers({"Content-Type":"application/json"});
    var url = "http://localhost:8080/api/registration/is/user/registered";
    url += "?email=" + email;

    return await this._http.get(url, {headers: headers})
      .map((res:Response) => (res.json()))
      .do((data) => (this._logger.info(data)))
      .toPromise();
  }

  public registerUser(email:String, provider:String):boolean {
    var userRegistered:boolean = false;
    var headers = new Headers({"Content-Type":"application/json"});
    var body = JSON.stringify({"email":email, "provider":provider});
    var url = "http://localhost:8080/api/registration/register/user";

    this._http.post(url, body, {headers: headers})
      .map((res:Response) => (res.json()))
      .do((data) => {this._logger.info(data)})
        .subscribe((registeredUser) => {
            this._logger.info("registered user? " + registeredUser.userRegistered);
            userRegistered = registeredUser.userRegistered;
          },
          (err) => { this._logger.error(err); },
          () => { this._logger.info("user registration complete"); }
        );

    return userRegistered;
  }

}