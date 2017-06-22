import { Component } from '@angular/core';
import { GroupModel } from '../../core/models/group-model';
import { DetailsComponent } from '../../shared/components/details.component';
import { GroupService } from '../../core/services/group.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

@Component({
  moduleId: module.id,
  selector: 'bs-group-details',
  templateUrl: 'group-details.component.html'
})
export class GroupDetailsComponent extends DetailsComponent<GroupModel> {
  constructor(service: GroupService,
              route: ActivatedRoute,
              breadcrumbService: BreadcrumbService) {
    super(service, route, breadcrumbService);
  }

  protected _update() {
    this._service.get(this._id).subscribe((model: GroupModel) => {
      this._model = model;
      this._breadcrumbService.loadEntityName(model);
      if (model.parentId) {
        this._service.get(model.parentId).subscribe(model => {
          this._breadcrumbService.load(model.name, model.id, 'group');
          if (model.parentId) {
            this._service.get(model.parentId).subscribe(model => {
              this._breadcrumbService.load(model.name, model.id, 'group');
            });
          }
        });
      }
    });
  }
}
