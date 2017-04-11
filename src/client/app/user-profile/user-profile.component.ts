import { Component, OnInit } from '@angular/core';
import { Model, ModelId } from '../core/models/model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RestService } from '../core/services/rest.service';
import { UserService } from '../core/services/user.service';

@Component({
  moduleId: module.id,
  selector: 'bs-user-profile',
  templateUrl: 'user-profile.component.html'
})
export class UserProfileComponent<UserModel> implements OnInit {
  protected _fakeUser = {
    name: 'Harry Potter',
    email: 'just-harry@gm.com'
  };

  public get fakeUser(): Object {
    return this._fakeUser;
  }

  public ngOnInit() {

  }

  public closeProfile() {
    console.log('close');
  }
}
