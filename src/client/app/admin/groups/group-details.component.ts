import { Component } from '@angular/core';
import { GroupModel } from '../../core/models/group-model';
import { DetailsComponent } from '../../shared/components/details.component';
import { GroupService } from '../../core/services/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { IBreadcrumb } from '../../core/components/breadcrumb/breadcrumb.component';
import { NotificationService } from '../../core/services/notification.service';
import { ModelId } from '../../core/models/model';

@Component({
  moduleId: module.id,
  selector: 'bs-group-details',
  templateUrl: 'group-details.component.html'
})
export class GroupDetailsComponent extends DetailsComponent<GroupModel> {
  constructor(service: GroupService,
              route: ActivatedRoute,
              router: Router,
              breadcrumbService: BreadcrumbService,
              notificationService: NotificationService) {
    super(service, route, router, breadcrumbService, notificationService);

    this._returnPath = '/admin/groups';
  }

  public delete(id: ModelId) {
    this._service.delete(id).subscribe(() => {
      if(this._model.parentId) {
        this._returnPath = `${'/admin/groups'}/${this._model.parentId}`;
      }
      this._router.navigate([this._returnPath]);
      this._notificationService.success('T_SUCCESS_DELETED');
    });
  }

  protected async _fillBreadcrumbs(model: GroupModel) {
    let breadcrumbs: IBreadcrumb[] = [];

    breadcrumbs.push({ label: model.name });

    let item = model;

    while (item.parentId) {
      item = await this._service.get(item.parentId).toPromise();

      breadcrumbs.push({ label: item.name, url: `${this._returnPath}/${item.id}` });
    }

    this._breadcrumbService.overrideBreadcrumb(breadcrumbs.reverse());
  }
}
