import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { ModelId } from '../../core/models/model';
import { UserModel, UserStatus } from '../../core/models/user-model';
import { GroupService } from '../../core/services/group.service';
import { NotificationService } from '../../core/services/notification.service';
import { IListResponse } from '../../core/services/rest.service';
import { UserService } from '../../core/services/user.service';
import { SelectComponent } from 'ng2-select';

@Component({
  moduleId: module.id,
  selector: 'bs-users-add-modal',
  templateUrl: 'users-add-modal.component.html'
})
export class UsersAddModalComponent implements OnChanges {
  private _groupId: string = 'null';
  private _availableUsers: UserModel[];
  private _selectedUsers: ModelId[] = [];
  private _modal: ModalDirective;
  private _usersAdded: EventEmitter<ModelId[]> = new EventEmitter<ModelId[]>();

  @ViewChild(SelectComponent)
  private _select: SelectComponent;

  @Input()
  public set groupId(value: string) {
    this._groupId = value;
  }

  public get availableUsers(): UserModel[] {
    return this._availableUsers;
  }

  public get selectedUsers(): ModelId[] {
    return this._selectedUsers;
  }

  public set selectedUsers(value: ModelId[]) {
    this._selectedUsers = value;
  }

  @Output()
  public get usersAdded(): EventEmitter<ModelId[]> {
    return this._usersAdded;
  }

  @ViewChild('modal')
  public set modal(value: ModalDirective) {
    this._modal = value;
  }

  constructor(protected _userService: UserService,
              protected _groupService: GroupService,
              protected _notificationService: NotificationService) {
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['groupId']) {
      this._load();
    }
  }

  public show() {
    this._load();
    this._modal.show();
  }

  public submit() {
    let transaction = this._selectedUsers.map(userId => this._groupService.addUser(this._groupId, userId));

    Observable.forkJoin(transaction).subscribe(() => {
      this._modal.hide();
      this._usersAdded.emit(this._selectedUsers);
      this._notificationService.success('T_USERS_ADDED_TO_GROUP');
    });
  }

  public selectUser(value: any) {
    this._selectedUsers.push(value.id);
  }

  public isSelected(user: any): boolean {
    return (this._selectedUsers) ? (this._selectedUsers.indexOf(user.id) !== -1) : false;
  }

  protected _load() {
    let allQueryParams = { status: UserStatus.Approved };
    let groupQueryParams = { status: UserStatus.Approved, groupId: this._groupId };

    Observable
      .forkJoin(
        this._userService.list(allQueryParams),
        this._userService.list(groupQueryParams)
      )
      .map(([allUsers, groupUsers]: IListResponse<UserModel>[]) => {
        return allUsers.data.filter(user => !groupUsers.data.find(x => x.id === user.id));
      })
      .subscribe((availableUsers: UserModel[]) => {
        this._availableUsers = availableUsers;
        let availableForSelectionUsers: any[] = [];
        this._availableUsers.forEach((user: UserModel) => {
          availableForSelectionUsers.push({id: user.id, text: `${user.name} (${user.email})`});
        });
        this._select.items = availableForSelectionUsers;
      });
  }
}
