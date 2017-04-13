import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bs-user-profile',
  templateUrl: 'user-profile.component.html'
})
export class UserProfileComponent<UserModel> {
  protected _fakeUser = {
    name: 'Harry Potter',
    email: 'just-harry@gm.com'
  };

  public get fakeUser(): Object {
    return this._fakeUser;
  }

  public closeProfile() {
    console.log('close');
  }
}
