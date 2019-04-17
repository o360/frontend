import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../core/models/user-model';
import { AdminUserService } from '../../core/services/admin-user.service';
import { DetailsComponent } from '../../shared/components/details.component';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { NotificationService } from '../../core/services/notification.service';
import { UserPictureService } from '../../core/services/user-picture.service';

@Component({
  selector: 'bs-user-details',
  templateUrl: `user-details.component.html`
})
export class AdminUserDetailsComponent extends DetailsComponent<UserModel> {
  constructor(service: AdminUserService,
              route: ActivatedRoute,
              router: Router,
              breadcrumbService: BreadcrumbService,
              notificationService: NotificationService,
              protected _userPictureService: UserPictureService) {
    super(service, route, router, breadcrumbService, notificationService);

    this._returnPath = '/admin/users';
  }

  protected _update() {
    this._service.get(this._id).subscribe((model: UserModel) => {
      this._model = model;
      this._fillBreadcrumbs(model);

      if (model.hasPicture) {
        this._loadUserPicture();
      }
    });
  }

  protected _loadUserPicture() {
    this._userPictureService.getPicture(this._id).subscribe(pic => this._model.picture = pic);
  }
}
