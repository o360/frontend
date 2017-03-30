import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../core/models/user-model';
import { UserService } from '../core/services/user.service';
import { FormComponent } from '../shared/components/form.component';

@Component({
  moduleId: module.id,
  selector: 'form-details',
  templateUrl: 'user-form.component.html',
})
export class UserFormComponent extends FormComponent<UserModel> {
  protected _returnPath = ['/users'];

  constructor(service: UserService,
              router: Router,
              route: ActivatedRoute) {
    super(service, router, route);
  }
}

