import { Component, Input, OnInit } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { GroupModel } from '../../core/models/group-model';
import { AdminGroupService } from '../../core/services/admin-group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { ModelId } from '../../core/models/model';

@Component({
  selector: 'bs-user-group-list',
  templateUrl: 'user-group-list.component.html'
})
export class AdminUserGroupListComponent extends ListComponent<GroupModel> implements OnInit {
  protected _userId: ModelId;

  @Input()
  public set userId(value: ModelId) {
    this._userId = value;
  }

  constructor(service: AdminGroupService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
    this._listName = 'users-groups';
  }

  public ngOnInit() {
    this._queryParams.userId = this._userId.toString();
    super.ngOnInit();
  }

  public delete(id?: ModelId) {
    (<AdminGroupService> this._service).removeUser(id, this._userId).subscribe(() => {
      this._update();
      this._notificationService.success('T_SUCCESS_DELETED');
    });
  }
}
