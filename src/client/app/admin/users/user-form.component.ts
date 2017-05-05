import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGender, UserModel, UserRole } from '../../core/models/user-model';
import { UserService } from '../../core/services/user.service';
import { FormComponent } from '../../shared/components/form.component';
import { NotificationService } from '../../core/services/notification.service';


@Component({
  moduleId: module.id,
  selector: 'bs-user-form',
  templateUrl: 'user-form.component.html'
})
export class UserFormComponent extends FormComponent<UserModel> {
  protected _roles: string[] = Object.values(UserRole);
  protected _genders: string[] = Object.values(UserGender);

  protected _returnPath = ['/admin/users'];

  public get roles(): string[] {
    return this._roles;
  }

  public get genders(): string[] {
    return this._genders;
  }

  constructor(service: UserService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService) {
    super(service, router, route, notificationService);
  }
}

