import { Component, Input, OnInit } from '@angular/core';
import { DetailsComponent } from '../../shared/components/details.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { GroupService } from '../../core/services/group.service';
import { GroupModel } from '../../core/models/group-model';
import { ModelId } from '../../core/models/model';
import { ListComponent } from '../../shared/components/list.component';
import { IQueryParams } from '../../core/services/rest.service';

@Component({
  moduleId: module.id,
  selector: 'bs-project-relation-lists',
  templateUrl: 'project-relation-list.component.html'
})
export class ProjectRelationListComponent extends ListComponent<ProjectModel> implements OnInit {
  protected _relations: any;

  // protected _formRelation: boolean = false;
  protected _groups: GroupModel[];
  protected _model: ProjectModel;

  public get relations(): any {
    return this._relations;
  }

  public get model(): T {
    return this._model;
  }

  // public get formRelation(): any {
  //   return this._formRelation;
  // }
  //
  // public onFormRelation() {
  //   return this._formRelation = !this._formRelation;
  // }
  protected _projectId: string = 'null';

  @Input()
  public set projectId(value: string) {
    this._projectId = value;
  }

  // public get projectId() {
  //   return this._projectId;
  // }
  public ngOnInit() {
    super.ngOnInit();
    this._load();
  }

  constructor(service: ProjectService, protected _groupService: GroupService) {
    super(service);
  }

  protected _update(): void {
    let queryParams: IQueryParams = { projectId: this._projectId };
    // if (this._projectId !== 'null') {
      this._projectId = queryParams.projectId;
      // this._query(queryParams);
      this._service.get(this._projectId).subscribe((model: ProjectModel) => {
        this._relations = model.relations;
      });
    // } else {
    //   // this._query(queryParams);
    //   this._service.get(this._projectId).subscribe((model: ProjectModel) => {
    //     this._relations = model.relations;
    //   });
    // }
    // this._service.get(this._projectId).subscribe((model: ProjectModel) => {
    //   this._relations = model.relations;
    // });
    super._update();
  }

  protected _load() {
    this._groupService.list().subscribe((list: GroupModel[]) => {
      this._groups = list;
    });
  }

  public removeRelation(relation: { groupFrom: ModelId, groupTo: ModelId, form: ModelId, kind: string }) {
    console.log(relation);
    let index: number = this._model.relations.indexOf(relation);
    console.log(index);
    if (index !== -1) {
      this._model.relations.splice(index, 1);
      this.save();
    }
  }

  public save() {
    this._service.save(this._model).subscribe(() => {
      this._update();

    });
  }
}
