import { Component } from '@angular/core';
import { DetailsComponent } from '../../shared/components/details.component';
import { EventModel, EventStatus } from '../../core/models/event-model';
import { AdminEventService } from '../../core/services/admin-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-event-details',
  templateUrl: 'event-details.component.html'
})
export class AdminEventDetailsComponent extends DetailsComponent<EventModel> {
  public get EventStatus() {
    return EventStatus;
  }

  constructor(service: AdminEventService,
              route: ActivatedRoute,
              router: Router,
              breadcrumbService: BreadcrumbService,
              notificationService: NotificationService) {
    super(service, route, router, breadcrumbService, notificationService);

    this._returnPath = '/admin/events';
  }

  public clone(model: EventModel) {
    (<AdminEventService>this._service).clone(model).subscribe(clone => {
      this._router.navigate([this._returnPath, clone.id, 'clone']);
      this._notificationService.success('T_SUCCESS_CLONED_EVENT');
    });
  }
}
