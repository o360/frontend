import { Component } from '@angular/core';
import { EventService } from '../core/services/event.service';
import { EventModel, EventStatus } from '../core/models/event-model';
import { IListResponse } from '../core/services/rest.service';
import { ListComponent } from '../shared/components/list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../core/services/notification.service';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'bs-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent extends ListComponent<EventModel> {

  constructor(service: EventService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  protected _update() {
    this._embedded = true;
    let queryParams = { status: EventStatus.InProgress };
    this._service.list(queryParams).subscribe((res: IListResponse<EventModel>) => {
      this._list = res.data;
      this._meta = res.meta;
    });
  }
}
