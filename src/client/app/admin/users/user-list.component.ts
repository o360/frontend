import { Component } from '@angular/core';
import { UserModel, UserStatus } from '../../core/models/user-model';
import { UserService } from '../../core/services/user.service';
import { ListComponent } from '../../shared/components/list.component';

@Component({
  moduleId: module.id,
  selector: 'bs-user-list',
  templateUrl: 'user-list.component.html'
})
export class UserListComponent extends ListComponent<UserModel> {
  constructor(service: UserService) {
    super(service);
  }

  public get UserStatus() {
    return UserStatus;
  }

  public approve(user: UserModel) {
    user.status = 'approved';
    this._service.save(user).subscribe(() => this._update());
  }

  public test() {
    console.log('test!');
  }
}
