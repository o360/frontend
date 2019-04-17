import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { ModelId } from '../../core/models/model';
import { ProjectModel } from '../../core/models/project-model';
import { AdminProjectService } from '../../core/services/admin-project.service';

@Component({
  selector: 'bs-group-project-list',
  templateUrl: 'group-project-list.component.html'
})
export class AdminGroupProjectListComponent extends ListComponent<ProjectModel> implements OnInit, OnChanges {
  protected _groupId: ModelId;

  @Input()
  public set groupId(value: ModelId) {
    this._groupId = value;
  }

  constructor(service: AdminProjectService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);

    this._listName = 'group-projects';
  }

  public ngOnInit() {
    this._queryParams.groupId = this._groupId.toString();
    super.ngOnInit();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['groupId']) {
      this._queryParams.groupId = this._groupId.toString();
      this._update();
    }
  }
}
