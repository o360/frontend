import { Component, OnInit } from '@angular/core';
import { DetailsComponent } from '../../shared/components/details.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectModel } from '../../core/models/project-model';
import { ProjectService } from '../../core/services/project.service';
import { GroupService } from '../../core/services/group.service';
import { GroupModel } from '../../core/models/group-model';
import { IListResponse } from '../../core/services/rest.service';

@Component({
  moduleId: module.id,
  selector: 'bs-project-details',
  templateUrl: 'project-details.component.html'
})
export class ProjectDetailsComponent extends DetailsComponent<ProjectModel> implements OnInit {
  protected _groups: GroupModel[];

  public ngOnInit() {
    super.ngOnInit();
    this._load();
  }

  public save() {
    this._service.save(this._model).subscribe(() => {
      this._update();

    });
  }

  constructor(service: ProjectService, route: ActivatedRoute, protected _groupService: GroupService) {
    super(service, route);
  }

  protected _load() {
    this._groupService.list().subscribe((list: IListResponse<GroupModel>) => {
      this._groups = list.data;
    });
  }
}
