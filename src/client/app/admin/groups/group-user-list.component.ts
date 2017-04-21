import { Component, Input } from '@angular/core';
import { UserModel } from '../../core/models/user-model';
import { UserService } from '../../core/services/user.service';
import { ListComponent } from '../../shared/components/list.component';

@Component({
  moduleId: module.id,
  selector: 'bs-group-user-list',
  templateUrl: 'group-user-list.component.html'
})
export class GroupUserListComponent extends ListComponent<UserModel> {
  protected _groupId: string = 'null';

  @Input()
  public set groupId(value: string) {
    this._groupId = value;
  }

  public get parentId() {
    return this._groupId;
  }

  constructor(service: UserService) {
    super(service);
  }
}
