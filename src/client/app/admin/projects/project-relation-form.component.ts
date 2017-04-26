import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { ProjectModel, RelationKind } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';
import { ModelId } from '../../core/models/model';


@Component({
  moduleId: module.id,
  selector: 'bs-project-relation-form',
  templateUrl: 'project-relation-form.component.html'
})
export class ProjectRelationFormComponent extends FormComponent<ProjectModel> {
  protected _relation = {
    groupFrom: '',
    groupTo: '',
    form: '',
    kind: ''
  };
  protected _kinds: string[] = Object.values(RelationKind);
  protected _groups: GroupModel[];
  protected _returnPath = ['/admin/projects'];
  public evalForms = [{
    id: 1,
    name: 'First'
  }, {
    id: 2,
    name: 'Second'
  }];

  public get groups(): GroupModel[] {
    return this._groups;
  }

  public get kinds(): string[] {
    return this._kinds;
  }

  public get relation(): {} {
    return this._relation;
  }

  constructor(service: ProjectService,
              router: Router,
              route: ActivatedRoute,
              protected _groupService: GroupService) {
    super(service, router, route);
  }

  protected _load() {
    this._groupService.list().subscribe((list: GroupModel[]) => {
      this._groups = list;
      super._load();
    });
  }

  public addRelation(relation: { groupFrom: ModelId, groupTo: ModelId, form: ModelId, kind: string }) {
    this._model.relations.push(relation);
    this.save();
  }

  public save() {
    this._service.save(this._model).subscribe(() => {
      if (this._returnPath) {
        this._router.navigate(this._returnPath);
      }
    });
  }
}

