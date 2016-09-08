import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Logger } from 'angular2-logger/core';

import { AddEventService } from '../../';
import { FirebaseAuthService } from '../../../signin';

@Component({
  selector: 'addevent',
  templateUrl: 'addevent.component.html',
  styleUrls: ['addevent.scss']
})
export class AddEvent implements OnInit {

  // vars
  private _addEventForm:FormGroup;
  private _eventTitle:FormControl;
  private _eventDescription:FormControl;

  constructor(private _logger:Logger,
              private _addEventService:AddEventService,
              private _formBuilder:FormBuilder,
              private _fbAuthService:FirebaseAuthService) {}

  ngOnInit() {
    // init vars
    this. _eventTitle = new FormControl('', Validators.required);
    this._eventDescription = new FormControl('', Validators.required);
    this._addEventForm = this._formBuilder.group({
      'eventTitle': this._eventTitle,
      'eventDescription': this._eventDescription
    });
  }

  private addEvent():void {
    // get add event values
    var title:String = this._eventTitle.value;
    var description:String = this._eventDescription.value;
    var email:String = this._fbAuthService.getCurrentUser().email;

    this._logger.info('Adding event');
    this._logger.info('title: ' + title);
    this._logger.info('description: ' + description);
    this._logger.info('email: ' + email);

    this._addEventService.addEvent(title, description, email);
  }

}
