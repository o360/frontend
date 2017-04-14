import { Component, OnInit } from '@angular/core';
import { UserProfileComponent } from './user-profile.component';
import { UserModel } from '../core/models/user-model';
import { UserService } from '../core/services/user.service';
import { AuthService } from '../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../shared/components/form.component';

@Component({
  moduleId: module.id,
  selector: 'bs-user-profile-edit',
  templateUrl: 'user-profile-edit.component.html'
})
export class UserProfileEditComponent extends FormComponent<UserModel>  implements OnInit{
  protected _returnPath = ['/profile'];

  constructor(service: UserService,
              router: Router,
              route: ActivatedRoute,
              protected _auth: AuthService) {
    super(service, router, route);
  }

  public submitProfileChanges() {
    this._service.save(this.model).subscribe(() => {
      if (this._returnPath) {
        this._router.navigate(this._returnPath);
      }
    });
  }
  public ngOnInit() {
    this._id = this._auth.user.id;
    this._load();
  }
}
