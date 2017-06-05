import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';
import { ListComponent } from '../../shared/components/list.component';
import { NotificationService } from '../../core/services/notification.service';
import { Filter, FilterType } from '../../core/models/filter';
import { IListResponse, IQueryParams } from '../../core/services/rest.service';

@Component({
  moduleId: module.id,
  selector: 'bs-group-list',
  templateUrl: 'group-list.component.html'
})
export class GroupListComponent extends ListComponent<GroupModel> implements OnInit, OnChanges {
  protected _filters: Filter[] = [{
    name: 'T_GROUP_NAME',
    field: 'name',
    type: FilterType.String,
  }];

  protected _parentId: string = 'null';

  @Input()
  public set parentId(value: string) {
    this._parentId = value;
  }

  public get parentId() {
    return this._parentId;
  }

  constructor(service: GroupService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnInit() {
    this._queryParams.parentId = this._parentId;
    super.ngOnInit();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['parentId']) {
      Object.assign(this._queryParams, { parentId: this._parentId });
      this._update();
    }
  }

  public filterChange(value: IQueryParams) {
    console.log(value.name);
    this._service.list(this._queryParams).subscribe((res: IListResponse<GroupModel>) => {
      this._list = res.data;
      console.log(this._list);
    });
    this._list = this._list.filter(x => x.name === value.name);
    console.log(this._list);
  }
}
