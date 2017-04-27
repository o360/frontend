import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DetailsComponent } from '../../shared/components/details.component';
import { ProjectService } from '../../core/services/project.service';
import { ProjectModel } from '../../core/models/project-model';

@Component({
  moduleId: module.id,
  selector: 'project-relation-details',
  templateUrl: `project-relation-details.component.html`
})
export class ProjectRelationDetailsComponent extends DetailsComponent<ProjectModel> implements OnInit {
  protected _relation: Object;

  public get relation(): Object {
    return this._relation;
  }

  public ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this._relation = params;
    });
  }

  constructor(service: ProjectService,
              route: ActivatedRoute) {
    super(service, route);
  }
}

