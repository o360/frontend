import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';
import { ListComponent } from '../../shared/components/list.component';
import { NotificationService } from '../../core/services/notification.service';
import { Filter, FilterType } from '../../core/models/filter';
import { IListResponse } from '../../core/services/rest.service';
import { Observable } from 'rxjs/Observable';

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
    values: Object.values(GroupModel.name).map(x => ({ value: x }))
  }];

  protected _parentId: string = 'null';
  protected _innerGroupState: boolean = false;

  @Input()
  public set parentId(value: string) {
    this._parentId = value;
  }

  public get parentId() {
    return this._parentId;
  }

  @Output()
  public get innerGroupState(): boolean {
    return this._innerGroupState;
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
      this._list = [];
      Object.assign(this._queryParams, { parentId: this._parentId });
      this._update();
    }
  }

  public changeInnerGroupState() {
    return this._innerGroupState = !this._innerGroupState;
  }

  public _update() {
    this._service.list(this._queryParams).subscribe((res: IListResponse<GroupModel>) => {
      this._meta = res.meta;
      this._list = res.data;

      if (this._queryParams.name) {
        this._searchForParents(this._list);
      }
    });
  }

  protected _searchForParents(list: GroupModel[]) {
    if (list.length) {
      this._innerGroupState = true;
      Observable.forkJoin(list.filter(x => x.parentId)
        .map((group: GroupModel) => {
          return this._service.get(group.parentId);
        }))
        .subscribe((list: GroupModel[]) => {
          list.filter((group, i) => list.findIndex(listGroup => listGroup.id === group.id) === i)
            .filter(group => !this._list.find(listGroup => listGroup.id === group.id))
            .forEach((group: GroupModel) => {
              this._list = this._list.filter((listGroup) => listGroup.parentId !== group.id);
              this._list.push(group);
            });
          this._searchForParents(list);
        });
    } else {
      this._innerGroupState = false;
    }
  }
}


