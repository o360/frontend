import { Component } from '@angular/core';
import { UserModel, UserRole, UserStatus } from '../../core/models/user-model';
import { UserService } from '../../core/services/user.service';
import { ListComponent } from '../../shared/components/list.component';
import { Filter, FilterType } from '../../core/models/filter';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'bs-user-list',
  templateUrl: 'user-list.component.html'
})
export class UserListComponent extends ListComponent<UserModel> {
  protected _filters: Filter[] = [{
    name: 'T_USER_STATUS',
    field: 'status',
    type: FilterType.Select,
    values: Object.values(UserStatus).map(x => ({ name: 'T_USER_STATUS_' + x.toUpperCase(), value: x }))
  }, {
    name: 'T_USER_ROLE',
    field: 'role',
    type: FilterType.Select,
    values: Object.values(UserRole).map(x => ({ name: 'T_USER_ROLE_' + x.toUpperCase(), value: x }))
  }];

  constructor(service: UserService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  public get UserStatus() {
    return UserStatus;
  }

  public approve(user: UserModel) {
    user.status = UserStatus.Approved;
    this._service.save(user).subscribe(() => {
        this._update();
        this._notificationService.success('T_SUCCESS_SAVED');
      },
      error => this._update()
    );
  }
}
