import { Component } from '@angular/core';
import { DetailsComponent } from '../../shared/components/details.component';
import { EventModel, EventStatus } from '../../core/models/event-model';
import { EventService } from '../../core/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-event-details',
  templateUrl: 'event-details.component.html'
})
export class EventDetailsComponent extends DetailsComponent<EventModel> {
  public get EventStatus() {
    return EventStatus;
  }

  constructor(service: EventService,
              route: ActivatedRoute,
              breadcrumbService: BreadcrumbService,
              private _router: Router,
              private _notificationService: NotificationService) {
    super(service, route, breadcrumbService);
  }

  public clone(model: EventModel) {
    (<EventService>this._service).clone(model).subscribe(clone => {
      this._router.navigate(['/admin/events', clone.id, 'clone']);
      this._notificationService.success('T_SUCCESS_CLONED_EVENT');
    });
  }
}
