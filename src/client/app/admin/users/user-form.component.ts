import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel, UserRole } from '../../core/models/user-model';
import { UserService } from '../../core/services/user.service';
import { FormComponent } from '../../shared/components/form.component';


@Component({
  moduleId: module.id,
  selector: 'bs-user-form',
  templateUrl: 'user-form.component.html'
})
export class UserFormComponent extends FormComponent<UserModel> {
  protected _roles: string[] = Object.values(UserRole);
  protected _returnPath = ['/admin/users'];

  public get roles(): string[] {
    return this._roles;
  }

  constructor(service: UserService,
              router: Router,
              route: ActivatedRoute) {
    super(service, router, route);
  }
}

