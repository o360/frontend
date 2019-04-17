import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGender, UserModel, UserRole } from '../../core/models/user-model';
import { AdminUserService } from '../../core/services/admin-user.service';
import { FormComponent } from '../../shared/components/form.component';
import { NotificationService } from '../../core/services/notification.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { UserPictureService } from '../../core/services/user-picture.service';

@Component({
  selector: 'bs-user-form',
  templateUrl: 'user-form.component.html'
})
export class AdminUserFormComponent extends FormComponent<UserModel> implements OnInit {
  protected _roles: string[] = Object.values(UserRole);
  protected _genders: string[] = Object.values(UserGender);

  protected _returnPath = ['/admin/users'];

  public get roles(): string[] {
    return this._roles;
  }

  public get genders(): string[] {
    return this._genders;
  }

  constructor(service: AdminUserService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              breadcrumbService: BreadcrumbService,
              protected _userPictureService: UserPictureService) {
    super(service, router, route, notificationService, breadcrumbService);
  }

  public savePicture(image: any) {
    (<AdminUserService> this._service).setPicture(this._id, image).subscribe(picture => {
      this._getUserPicture();
    }, error => this._notificationService.error(error));
  }

  protected _processModel(model: UserModel) {
    super._processModel(model);

    if (model.hasPicture) {
      this._getUserPicture();
    }
  }

  protected _getUserPicture() {
    this._userPictureService.getPicture(this._id).subscribe(picture => this._model.picture = picture);
  }
}

