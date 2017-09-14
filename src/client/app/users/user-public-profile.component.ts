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
  moduleId: module.id,
  selector: 'bs-public-user-profile',
  templateUrl: 'user-public-profile.component.html'
})
export class UserPublicProfileComponent extends DetailsComponent<UserModel> {
  protected _avatar: any;
  protected _groups: GroupModel[];

  public get avatar(): any {
    return this._avatar;
  }

  public get groups(): string {
    return this._groups.map(_ => _.name).join(', ');
  }

  public get hasGroups(): boolean {
    return !!this._groups;
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
    this._userPictureService.getPicture(this._id).subscribe(pic => this._avatar = pic);
  }

  protected _getUserGroups() {
    (<UserService>this._service).getGroups(this._id)
      .subscribe((response: IListResponse<GroupModel>) => this._groups = response.data);
  }
}
