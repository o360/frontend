import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../core/models/user-model';
import { AdminUserService } from '../../core/services/admin-user.service';
import { DetailsComponent } from '../../shared/components/details.component';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'bs-user-details',
  templateUrl: `user-details.component.html`
})
export class AdminUserDetailsComponent extends DetailsComponent<UserModel> {
  constructor(service: AdminUserService,
              route: ActivatedRoute,
              router: Router,
              breadcrumbService: BreadcrumbService,
              notificationService: NotificationService) {
    super(service, route, router, breadcrumbService, notificationService);

    this._returnPath = '/admin/users';
  }
}
