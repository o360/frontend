import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { UserService } from '../../core/services/user.service';
import { UserModel, UserRole } from '../../core/models/user-model';


@Component({
  moduleId: module.id,
  selector: 'bs-form-details',
  templateUrl: 'user-form.component.html'
})
export class UserFormComponent extends FormComponent<UserModel> {
  protected _roles: string[] = Object.values(UserRole);

  public get roles(): string[] {
    return this._roles;
  }

  constructor(service: UserService,
              router: Router,
              route: ActivatedRoute) {
    super(service, router, route);
  }
}

