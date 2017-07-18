import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';
import { IListResponse } from '../../core/services/rest.service';
import { NotificationService } from '../../core/services/notification.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';


@Component({
  moduleId: module.id,
  selector: 'bs-project-form',
  templateUrl: 'project-form.component.html'
})
export class ProjectFormComponent extends FormComponent<ProjectModel> {
  protected _auditors: GroupModel[];
  protected _returnPath: any[] = ['/admin/projects'];

  public get auditors(): GroupModel[] {
    return this._auditors;
  }

  constructor(service: ProjectService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              breadcrumbService: BreadcrumbService,
              protected _groupService: GroupService) {
    super(service, router, route, notificationService, breadcrumbService);
  }

  protected _load() {
    this._groupService.list().subscribe((list: IListResponse<GroupModel>) => {
      this._auditors = list.data;
      super._load();
    });
  }
}

