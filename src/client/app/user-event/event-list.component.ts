import { Component, Input } from '@angular/core';
import { ListComponent } from '../shared/components/list.component';
import { EventModel, EventStatus } from '../core/models/event-model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../core/services/notification.service';
import { IListResponse } from '../core/services/rest.service';
import { EventService } from '../core/services/event.service';

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

  public get EventStatus() {
    return EventStatus;
  }

  constructor(service: EventService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  protected _update() {
    let queryParams = {status: this._status, sort: 'start', onlyAvailable: 'true'};

    this._fetching = this._service.list(queryParams).subscribe((res: IListResponse<EventModel>) => {
      this._meta = res.meta;
      this._list = res.data;
    });
  }
}
