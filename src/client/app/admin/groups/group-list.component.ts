import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';
import { ListComponent } from '../../shared/components/list.component';
import { NotificationService } from '../../core/services/notification.service';
import { Filter, FilterType } from '../../core/models/filter';
import { IListResponse } from '../../core/services/rest.service';

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
      Object.assign(this._queryParams, { parentId: this._parentId });
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
        let result = this._list.map(function (a) {
          return a.parentId;
        });
        for (let i = 0; i < result.length; i++) {
          if (result[i] !== undefined) {
            this._service.get(result[i]).subscribe((parentModel: GroupModel) => {
              this._list = this._list.filter(function (el) {
                return el.parentId !== result[i];
              });
              if (parentModel.parentId) {
                this._service.get(parentModel.parentId).subscribe((firstParentModel: GroupModel) => {
                  if (!this._list.find(x => x.id === firstParentModel.id)) {
                    this._list.push(firstParentModel);
                  }
                });
              } else {
                if (!this._list.find(x => x.id === parentModel.id)) {
                  this._list.push(parentModel);
                }
              }
              this._innerGroupState = true;
            });
          }
        }
      }
      this._innerGroupState = false;
    });
  }
}
