import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel, UserRole } from '../../core/models/user-model';
import { UserService } from '../../core/services/user.service';
import { FormComponent } from '../../shared/components/form.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  moduleId: module.id,
  selector: 'bs-user-form',
  templateUrl: 'user-form.component.html'
})
export class UserFormComponent extends FormComponent<UserModel> {
  protected _roles: string[] = Object.values(UserRole);

  public get roles(): string[] {
    return this._roles;
  }

  constructor(service: UserService,
              router: Router,
              route: ActivatedRoute,
              toastsManager: ToastsManager,
              vcr: ViewContainerRef) {
    super(service, router, route, toastsManager, vcr);
  }
}

