import { Component, OnInit } from '@angular/core';
import { Model, ModelId } from '../core/models/model';
import { UserService } from '../core/services/user.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'bs-user-profile',
  templateUrl: 'user-profile.component.html',
})
export class UserProfileComponent<UserModel extends Model> implements OnInit {
  protected _user: UserModel;
  protected _id: ModelId;

  public get user(): UserModel {
    return this._user;
  }

  constructor(protected _service: UserService,
              protected _auth: AuthService) {
  }

  public ngOnInit() {
    this._id = this._auth.user.id;
    this._update();
  }

  protected _update() {
    this._service.get(this._id).subscribe((user: UserModel) => {
      this._user = user;
    });
  }
}
