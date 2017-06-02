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
    values: Object.values(GroupModel)

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
    if (changes['list']) {
     console.log('onchange');
    }
  }

  public filterChange(value: IQueryParams) {
    console.log(value);
    let queryParams = Object.assign({}, value);

    // queryParams.size = this._queryParams.size;
    // queryParams.number = this._queryParams.number;
    // queryParams.sort = this._queryParams.sort;
    console.log(this._filters[0]);
    console.log(this._filters[0].value);
    this._list.find(x => x.name === this._filters[0].value);
    this.filterUpdate();
  }

  public filterUpdate() {
    this._service.list(this._queryParams).subscribe((res: IListResponse<GroupModel>) => {
      // this._meta = res.meta;
      this._list = res.data;
      this._list.find(x => x.name === this._filters[0].value);
      console.log(this._list);
      console.log(this._list.find(x => x.name === this._filters[0].value);
      return Object.values(this._list);
    });
  }
}
