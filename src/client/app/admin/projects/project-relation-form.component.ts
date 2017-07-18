import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { GroupService } from '../../core/services/group.service';
import { RelationKind, RelationModel } from '../../core/models/relation-model';
import { RelationService } from '../../core/services/relation.service';
import { GroupModel } from '../../core/models/group-model';
import { ModelId } from '../../core/models/model';
import { IListResponse } from '../../core/services/rest.service';
import { FormService } from '../../core/services/form.service';
import { FormModel } from '../../core/models/form-model';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../../core/services/notification.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';


@Component({
  moduleId: module.id,
  selector: 'bs-project-relation-form',
  templateUrl: 'project-relation-form.component.html'
})
export class ProjectRelationFormComponent extends FormComponent<RelationModel> {
  protected _kinds: string[] = Object.values(RelationKind);
  protected _groups: GroupModel[];
  protected _forms: FormModel[];
  protected _projectId: ModelId = null;
  protected _returnPath = ['/admin/projects'];

  public get groups(): GroupModel[] {
    return this._groups;
  }

  public get forms(): FormModel[] {
    return this._forms;
  }

  public get kinds(): string[] {
    return this._kinds;
  }

  public get projectId() {
    return this._projectId;
  }

  public get RelationKind() {
    return RelationKind;
  }

  constructor(service: RelationService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              breadcrumbService: BreadcrumbService,
              protected _groupService: GroupService,
              protected _formService: FormService,
              protected _projectService: ProjectService) {
    super(service, router, route, notificationService, breadcrumbService);
  }

  protected _load() {
    Observable.forkJoin(
      this._groupService.list(),
      this._formService.list()
    ).subscribe(([groups, forms]: [IListResponse<GroupModel>, IListResponse<FormModel>]) => {
      this._groups = groups.data;
      this._forms = forms.data;

      super._load();
    });
  }

  protected _processRouteParams(params: Params) {
    if (params['projectId']) {
      this._projectId = +params['projectId'];
      this._returnPath = ['/admin/projects', this._projectId.toString()];
    }

    super._processRouteParams(params);
  }

  protected _processModel(model: RelationModel) {
    if (this._projectId) {
      model.projectId = this._projectId;
    }

    super._processModel(model);
  }

  public save() {
    this._returnPath = ['/admin/projects/', this._projectId.toString(), '/relations'];
    super.save();
  }

  protected _fillBreadcrumbs(model: RelationModel) {
    this._projectService.get(this._projectId).subscribe((project: ProjectModel) => {
      let breadcrumbs = [];

      breadcrumbs.push({ label: project.name, url: `/admin/projects/${project.id}` });
      breadcrumbs.push({ label: 'T_PROJECT_RELATION_DETAILS' });

      this._breadcrumbService.overrideBreadcrumb(breadcrumbs);
    });
  }
}


