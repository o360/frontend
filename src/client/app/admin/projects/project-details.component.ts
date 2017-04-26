import { Component, OnInit } from '@angular/core';
import { DetailsComponent } from '../../shared/components/details.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { GroupService } from '../../core/services/group.service';
import { GroupModel } from '../../core/models/group-model';
import { ModelId } from '../../core/models/model';

@Component({
  moduleId: module.id,
  selector: 'bs-project-details',
  templateUrl: 'project-details.component.html'
})
export class ProjectDetailsComponent extends DetailsComponent<ProjectModel> implements OnInit {
  protected _relations: any;
  protected _formRelation: boolean = false;
  protected _groups: GroupModel[];

  public get relations(): any {
    return this._relations;
  }

  public get formRelation(): any {
    return this._formRelation;
  }

  public onFormRelation() {
    return this._formRelation = !this._formRelation;
  }

  public ngOnInit() {
    super.ngOnInit();
    this._load();
  }

  constructor(service: ProjectService, route: ActivatedRoute, protected _groupService: GroupService) {
    super(service, route);
  }

  protected _update(): void {
    this._service.get(this._id).subscribe((model: ProjectModel) => {
      this._relations = model.relations;
    });
    super._update();
  }

  protected _load() {
    this._groupService.list().subscribe((list: GroupModel[]) => {
      this._groups = list;
    });
  }

  public removeRelation(relation: { groupFrom: ModelId, groupTo: ModelId, form: ModelId, kind: string }) {
    console.log(this._model);
    console.log(relation);
    let index: number = this._model.relations.indexOf(relation);
    // let index: number = this._model.relations.findIndex(relation);
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
