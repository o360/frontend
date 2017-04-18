import { Component } from '@angular/core';
import { UserModel, UserStatus } from '../../core/models/user-model';
import { UserService } from '../../core/services/user.service';
import { ListComponent } from '../../shared/components/list.component';
import { Filter, FilterType } from '../../core/models/filter';

@Component({
  moduleId: module.id,
  selector: 'bs-user-list',
  templateUrl: 'user-list.component.html'
})
export class UserListComponent extends ListComponent<UserModel> {
  protected _filters: Filter[] = [{
    name: 'T_USER_SEARCH',
    field: 'search',
    type: FilterType.String
  }, {
    name: 'T_USER_STATUS',
    field: 'status',
    type: FilterType.Select,
    values: ['new', 'approved']
  }, {
    name: 'T_USER_ROLE',
    field: 'role',
    type: FilterType.Select,
    values: ['user', 'admin']
  }, {
    name: 'T_USER_SORT',
    field: 'sort',
    type: FilterType.Select,
    values: ['id', 'name', 'email', 'role', 'status']
  }];

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

  public filterChange(value: any) {
    console.log(value);
  }
}
