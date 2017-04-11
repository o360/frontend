import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bs-user-profile-edit',
  templateUrl: 'user-profile-edit.component.html'
})
export class UserProfileEditComponent implements OnInit {
  protected _fakeUser = {
    name: 'Harry Potter',
    email: 'just-harry@gm.com'
  };

  public get fakeUser(): Object {
    return this._fakeUser;
  }

  constructor() {
  }

  ngOnInit() {
  }

  public uploadPicture() {
    console.log('uploadPicture');
  }

  public closeProfile() {
    console.log('close');
  }

  public submitProfileChanges() {
    console.log('submitProfileChanges');
  }
}
