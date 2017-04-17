import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../core/models/user-model';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { FormComponent } from '../shared/components/form.component';

@Component({
  moduleId: module.id,
  selector: 'bs-user-profile-form',
  templateUrl: 'user-profile-form.component.html'
})
export class UserProfileFormComponent extends FormComponent<UserModel> implements OnInit {
  protected _returnPath = ['/profile'];

  constructor(service: UserService,
              router: Router,
              route: ActivatedRoute,
              protected _auth: AuthService) {
    super(service, router, route);
  }

  public ngOnInit() {
    this._id = this._auth.user.id;
    this._load();
  }
}
