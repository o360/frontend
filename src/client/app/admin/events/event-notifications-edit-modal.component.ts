import { Component, Input, ViewChild } from '@angular/core';
import { EventModel } from '../../core/models/event-model';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-event-notifications-edit-modal',
  templateUrl: 'event-notifications-edit-modal.component.html'
})
export class EventNotificationsEditModalComponent {
  protected _model: EventModel;
  protected _modal: ModalDirective;


  public get model(): EventModel {
    return this._model;
  }

  @Input()
  public set model(value: EventModel) {
    this._model = value;
  }

  @ViewChild('modal')
  public set modal(value: ModalDirective) {
    this._modal = value;
  }

  public show() {
    this._modal.show();
  }
}
