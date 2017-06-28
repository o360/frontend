import { Component } from '@angular/core';
import { GroupModel } from '../../core/models/group-model';
import { DetailsComponent } from '../../shared/components/details.component';
import { GroupService } from '../../core/services/group.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { ModelId } from '../../core/models/model';
import { IBreadcrumb } from '../../core/components/breadcrumb/breadcrumb.component';

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

  protected async _fillBreadcrumbs(model: GroupModel) {
    let breadcrumbs: IBreadcrumb[] = [];

    breadcrumbs.push({ label: model.name });

    let item = model;

    while (item.parentId) {
      item = await this._service.get(item.parentId).toPromise();

      breadcrumbs.push({ label: item.name, url: `/admin/groups/${item.id}` });
    }

    this._breadcrumbService.overrideBreadcrumb(breadcrumbs.reverse());
  }
}
