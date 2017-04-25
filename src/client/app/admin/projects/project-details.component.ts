import { Component } from '@angular/core';
import { DetailsComponent } from '../../shared/components/details.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';

@Component({
  moduleId: module.id,
  selector: 'bs-project-details',
  templateUrl: 'project-details.component.html'
})
export class ProjectDetailsComponent extends DetailsComponent<ProjectModel> {
  protected _relations: any;

  public get relations(): any {
    return this._relations;
  }

  constructor(service: ProjectService, route: ActivatedRoute) {
    super(service, route);
  }

  protected _update(): void {
    this._service.list().subscribe((list: ProjectModel[]) => {
      this._relations = list.map(function(a) {return a.relations;});
      super._update();
      console.log(list.map(function(a) {return a.relations;}));
    });
  }
}
