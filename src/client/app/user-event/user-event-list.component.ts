import { Component, Input } from '@angular/core';
import { ListComponent } from '../shared/components/list.component';
import { EventModel } from '../core/models/event-model';
import { EventService } from '../core/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../core/services/notification.service';
import { IListResponse } from '../core/services/rest.service';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-user-event-list',
  templateUrl: 'user-event-list.component.html'
})
export class UserEventListComponent extends ListComponent<EventModel> {
  private _status: string = 'null';

  @Input()
  public set status(value: string) {
    this._status = value;
  }

  constructor(service: EventService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  protected _update() {
    let queryParams = { status: this._status, sort: 'start', onlyAvailable: 'true' };

    this._service.list(queryParams).subscribe((res: IListResponse<EventModel>) => {
      this._meta = res.meta;
      this._list = res.data;
    });
  }
}
