import { Component } from '@angular/core';
import { ListComponent } from '../shared/components/list.component';
import { UserModel } from '../core/models/user-model';
import { UserService } from '../core/services/user.service';

@Component({
  moduleId: module.id,
  selector: 'bs-admin-user-list',
  templateUrl: 'user-list.component.html'
})
export class UserListComponent extends ListComponent<UserModel> {
  constructor(service: UserService) {
    super(service);
  }
}
