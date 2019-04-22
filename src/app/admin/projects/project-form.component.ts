import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { ProjectModel } from '../../core/models/project-model';
import { AdminProjectService } from '../../core/services/admin-project.service';
import { GroupModel } from '../../core/models/group-model';
import { AdminGroupService } from '../../core/services/admin-group.service';
import { IListResponse } from '../../core/services/rest.service';
import { NotificationService } from '../../core/services/notification.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

@Component({
  selector: 'bs-project-form',
  templateUrl: 'project-form.component.html'
})
export class AdminProjectFormComponent extends FormComponent<ProjectModel> {
  protected _auditors: GroupModel[];
  protected _returnPath: any[] = ['/admin/projects'];

  public get auditors(): GroupModel[] {
    return this._auditors;
  }

  constructor(service: AdminProjectService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              breadcrumbService: BreadcrumbService,
              protected _groupService: AdminGroupService) {
    super(service, router, route, notificationService, breadcrumbService);
  }

  protected _load() {
    this._groupService.list().subscribe((list: IListResponse<GroupModel>) => {
      this._auditors = list.data;
      super._load();
    });
  }
}
