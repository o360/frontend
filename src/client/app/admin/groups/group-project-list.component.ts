import { Component, Input, OnInit } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { ModelId } from '../../core/models/model';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';

@Component({
  moduleId: module.id,
  selector: 'bs-group-project-list',
  templateUrl: 'group-project-list.component.html'
})
export class GroupProjectListComponent extends ListComponent<ProjectModel> implements OnInit {
  protected _groupId: ModelId;

  @Input()
  public set groupId(value: ModelId) {
    this._groupId = value;
  }

  constructor(service: ProjectService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnInit() {
    this._queryParams.groupId = this._groupId.toString();
    super.ngOnInit();
  }
}
