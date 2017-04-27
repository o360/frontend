import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProjectRelation, ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { ListComponent } from '../../shared/components/list.component';
import { IListResponse } from '../../core/services/rest.service';

@Component({
  moduleId: module.id,
  selector: 'bs-project-relation-list',
  templateUrl: 'project-relation-list.component.html'
})
export class ProjectRelationListComponent extends ListComponent<ProjectModel> implements OnInit, OnChanges {
  protected _relations: any;
  protected _model: ProjectModel;
  protected _index: number;

  public get relations(): any {
    return this._relations;
  }

  public get index(): any {
    return this._index;
  }

  public get model(): ProjectModel {
    return this._model;
  }

  protected _projectId: string = 'null';

  @Input()
  public set projectId(value: string) {
    this._projectId = value;
  }

  public get projectId() {
    return this._projectId;
  }

  public ngOnInit() {
    this._queryParams.projectId = this._projectId;
    super.ngOnInit();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId']) {
      Object.assign(this._queryParams, { projectId: this._projectId });
      this._update();
    }
  }

  public getIndex(relation: Object) {
    this._index = this._relations.indexOf(relation);
  }

  public removeRelation(relation: IProjectRelation) {
    this.getIndex(relation);
    if (this._index !== -1) {
      this._relations.splice(this._index, 1);
      this.save();
    }
  }

  public relationDetails(relation: Object) {
    this.getIndex(relation);
    if (this._index !== -1) {
      this._router.navigate(['/admin/projects/', this._projectId, 'details', relation]);
    }
  }

  public save() {
    this._service.list(this._queryParams).subscribe((res: IListResponse<ProjectModel>) => {
      let result: ProjectModel = res.data.filter(x => x.id === this._projectId)[0];
      result.relations = this._relations;
      this._querySave(result);
    });
  }

  constructor(service: ProjectService,
              activatedRoute: ActivatedRoute,
              router: Router) {
    super(service, activatedRoute, router);
  }

  protected _update(): void {
    this._service.list(this._queryParams).subscribe((res: IListResponse<ProjectModel>) => {
      let result = res.data.filter(x => x.id === this._projectId)[0];
      this._relations = result.relations;
    });
    super._update();
  }

  protected _querySave(result: ProjectModel) {
    this._service.save(result).subscribe(() => {
      this._update();
    });
  }
}
