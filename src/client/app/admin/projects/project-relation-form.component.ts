import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form.component';
import { ProjectModel, RelationKind } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';
import { ModelId } from '../../core/models/model';
import { IListResponse } from '../../core/services/rest.service';


@Component({
  moduleId: module.id,
  selector: 'bs-project-relation-form',
  templateUrl: 'project-relation-form.component.html'
})
export class ProjectRelationFormComponent extends FormComponent<ProjectModel> implements OnInit, OnChanges {
  protected _index: number;
  protected _relation: {
    groupFrom: ModelId,
    groupTo: ModelId,
    form: number,
    kind: string
  };
  protected _kinds: string[] = Object.values(RelationKind);
  protected _groups: GroupModel[];

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

  public get relation(): any {
    return this._relation;
  }

  public set relation(value: any) {
    this._relation = value;
  }

  @Input()
  public set index(value: number) {
    this._index = value;
  }

  public get index() {
    return this._index;
  }

  public addRelation() {
    let relation = {
      groupTo: this._model.groupTo,
      groupFrom: this._model.groupFrom,
      form: this._model.form,
      kind: this._model.kind,
    };
    if (this._index !== undefined) {
      this._model.relations[this._index] = relation;
    } else {
      this._model.relations.push(relation);
    }
    this.save();
  }

  constructor(service: ProjectService,
              router: Router,
              route: ActivatedRoute,
              protected _groupService: GroupService) {
    super(service, router, route);
  }

  protected _load() {
    this._groupService.list().subscribe((list: IListResponse<GroupModel>) => {
      this._groups = list.data;
    });
    super._load();
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['index']) {
      this._index = changes['index'].currentValue;
    }
    this.ngOnInit();
  }
}


