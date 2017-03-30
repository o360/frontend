import { Component } from '@angular/core';
import { UserModel } from '../core/models/user-model';
import { UserService } from '../core/services/user.service';
import { ListComponent } from '../shared/components/list.component';

@Component({
  moduleId: module.id,
  selector: 'bs-user-list',
  templateUrl: 'user-list.component.html'
})
export class UserListComponent extends ListComponent<UserModel> {
  constructor(service: UserService) {
    super(service);
  }
}
