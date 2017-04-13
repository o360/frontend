import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bs-user-profile-edit',
  templateUrl: 'user-profile-edit.component.html'
})
export class UserProfileEditComponent {
  protected _fakeUser = {
    name: 'Harry Potter',
    email: 'just-harry@gm.com'
  };

  public get fakeUser(): Object {
    return this._fakeUser;
  }

  public uploadPicture() {
    console.log('uploadPicture');
  }

  public submitProfileChanges() {
    console.log('submitProfileChanges');
  }
}
