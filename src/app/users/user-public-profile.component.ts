import { Component } from '@angular/core';
import { DetailsComponent } from '../shared/components/details.component';
import { UserModel } from '../core/models/user-model';
import { UserService } from '../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../core/services/breadcrumb.service';
import { NotificationService } from '../core/services/notification.service';
import { UserPictureService } from '../core/services/user-picture.service';
import { IListResponse } from '../core/services/rest.service';
import { GroupModel } from '../core/models/group-model';

@Component({
  selector: 'bs-public-user-profile',
  templateUrl: 'user-public-profile.component.html'
})
export class UserPublicProfileComponent extends DetailsComponent<UserModel> {
  public get hasGroups(): boolean {
    return !!this._model.groups;
  }

  constructor(service: UserService,
              route: ActivatedRoute,
              router: Router,
              breadcrumbService: BreadcrumbService,
              notificationService: NotificationService,
              protected _userPictureService: UserPictureService) {
    super(service, route, router, breadcrumbService, notificationService);
  }

  protected _update() {
    this._service.get(this._id).subscribe((model: UserModel) => {
      this._model = model;
      this._fillBreadcrumbs(model);

      if (model.hasPicture) {
        this._loadUserPicture();
      }

      this._getUserGroups();
    });
  }

  protected _loadUserPicture() {
    this._userPictureService.getPicture(this._id).subscribe(pic => this._model.picture = pic);
  }

  protected _getUserGroups() {
    (<UserService>this._service).getGroups(this._id)
      .subscribe((response: IListResponse<GroupModel>) => this._model.groups = response.data
        .map(_ => _.name).join(', '));
  }
}
