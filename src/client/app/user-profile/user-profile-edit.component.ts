import { Component } from '@angular/core';
import { UserProfileComponent } from './user-profile.component';
import { UserModel } from '../core/models/user-model';
import { UserService } from '../core/services/user.service';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-user-profile-edit',
  templateUrl: 'user-profile-edit.component.html'
})
export class UserProfileEditComponent extends UserProfileComponent<UserModel> {
  protected _returnPath = ['/profile'];

  constructor(service: UserService,
              auth: AuthService,
              protected _router: Router) {
    super(service, auth);
  }

  public submitProfileChanges() {
    this._service.save(this._user).subscribe(() => {
      if (this._returnPath) {
        this._router.navigate(this._returnPath);
      }
    });
  }
}
