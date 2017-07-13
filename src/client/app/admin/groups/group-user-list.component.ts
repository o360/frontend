import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelId } from '../../core/models/model';
import { UserModel } from '../../core/models/user-model';
import { GroupService } from '../../core/services/group.service';
import { UserService } from '../../core/services/user.service';
import { ListComponent } from '../../shared/components/list.component';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'bs-group-user-list',
  templateUrl: 'group-user-list.component.html'
})
export class GroupUserListComponent extends ListComponent<UserModel> implements OnInit, OnChanges {
  private _groupId: string = 'null';

  @Input()
  public set groupId(value: string) {
    this._groupId = value;
  }

  public get groupId(): string {
    return this._groupId;
  }

  constructor(service: UserService,
              protected _groupService: GroupService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);

    this._listName = '#group-users';
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['groupId']) {
      this._queryParams = Object.assign(this._queryParams, { groupId: this._groupId });
      this._update();
    }
  }

  public delete(userId ?: ModelId) {
    this._groupService.removeUser(this._groupId, userId).subscribe(() => {
      this._update();
      this._notificationService.success('T_SUCCESS_DELETED');
    });
  }

  public usersAdded() {
    this._update();
  }
}
