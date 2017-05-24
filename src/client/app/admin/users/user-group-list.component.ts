import { Component, Input } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { ModelId } from '../../core/models/model';

@Component({
  moduleId: module.id,
  selector: 'bs-user-group-list',
  templateUrl: 'user-group-list.component.html'
})
export class UserGroupListComponent extends ListComponent<GroupModel> {
  protected _userId: ModelId;

  @Input()
  public set userId(value: ModelId) {
    this._userId = value;
  }

  constructor(service: GroupService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnInit() {
    this._queryParams.userId = this._userId.toString();
    super.ngOnInit();
  }
}
