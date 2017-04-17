import { Component } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { UserService } from '../../core/services/user.service';
import { UserModel, UserStatus } from '../../core/models/user-model';

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
}
