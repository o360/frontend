import { Component, Input } from '@angular/core';
import { ListComponent } from '../shared/components/list.component';
import { EventModel, EventState, EventStatus } from '../core/models/event-model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../core/services/notification.service';
import { IListResponse } from '../core/services/rest.service';
import { EventService } from '../core/services/event.service';
import * as moment from 'moment';
import { DateFormat } from '../shared/components/datetime/datetime-picker.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-user-event-list',
  templateUrl: 'event-list.component.html'
})
export class EventListComponent extends ListComponent<EventModel> {
  protected _status: string = 'null';

  @Input()
  public set status(value: string) {
    this._status = value;
  }

  public get status(): string {
    return this._status;
  }

  public get EventState() {
    return EventStatus;
  }

  public get EventStatus() {
    return EventStatus;
  }

  constructor(service: EventService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService,
              protected _translate: TranslateService) {
    super(service, activatedRoute, router, notificationService);

    this._translate.onLangChange.subscribe(() => this._updateDateLeft());
  }

  protected _update() {
    let queryParams = {status: this._status, sort: 'start', onlyAvailable: 'true'};

    this._service.list(queryParams).subscribe((res: IListResponse<EventModel>) => {
      this._meta = res.meta;
      this._list = res.data;
      this._list.map(item => {
        let totalForms = item.userInfo.totalFormsCount;
        let answeredForms = item.userInfo.answeredFormsCount;

        if (answeredForms === 0) {
          item.tempState = EventState.NotStarted;
        } else if (answeredForms > 0) {
          item.tempState = EventState.PartFilled;
        } else if (totalForms === answeredForms) {
          item.tempState = EventState.FullFilled;
        }
        let endDate = item.end.format(DateFormat.DateTime);
        item.tempTimeLeft = moment(endDate, 'DD.MM.YYYY HH:mm').fromNow();
      });
    });
  }

  protected _updateDateLeft() {
    this._list.map(item => {
      let endDate = item.end.format(DateFormat.DateTime);
      item.tempTimeLeft = moment(endDate, 'DD.MM.YYYY HH:mm').fromNow();
    });
  }
}
