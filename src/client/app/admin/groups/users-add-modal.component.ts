import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { ModelId } from '../../core/models/model';
import { UserModel, UserStatus } from '../../core/models/user-model';
import { AdminGroupService } from '../../core/services/admin-group.service';
import { NotificationService } from '../../core/services/notification.service';
import { IListResponse } from '../../core/services/rest.service';
import { AdminUserService } from '../../core/services/admin-user.service';
import { Utils } from '../../utils';
import { TranslateService } from '@ngx-translate/core';
import { Select2OptionData, Select2Component } from 'ng2-select2/ng2-select2';

@Component({
  moduleId: module.id,
  selector: 'bs-users-add-modal',
  templateUrl: 'users-add-modal.component.html'
})
export class AdminUsersAddModalComponent implements OnInit {
  private _groupId: ModelId = null;
  private _selectedUsers: string[] = [];
  private _modal: ModalDirective;
  private _usersAdded: EventEmitter<ModelId[]> = new EventEmitter<ModelId[]>();
  private _availableUsers: Select2OptionData[] = [];
  private _options: Select2Options;
  private _users: Select2Component;

  @Input()
  public set groupId(value: string) {
    this._groupId = value;
  }

  public get availableUsers(): Select2OptionData[] {
    return this._availableUsers;
  }

  public get options() {
    return this._options;
  }

  public get selectedUsers(): string[] {
    return this._selectedUsers;
  }

  public set selectedUsers(value: string[]) {
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

  @ViewChild('users')
  public set users(value: Select2Component) {
    this._users = value;
  }

  constructor(private _userService: AdminUserService,
              private _groupService: AdminGroupService,
              private _notificationService: NotificationService,
              private _translate: TranslateService) {
  }

  public ngOnInit() {
    this._options = {
      allowClear: true,
      placeholder: '',
      multiple: true,
      openOnEnter: true,
      closeOnSelect: true,
      dropdownAutoWidth: true,
      escapeMarkup: (term: any) => {
        return (term === 'No results found') ? this._translate.instant('T_EMPTY') : term;
      },
      matcher: (term: string, text: string) => {
        return new RegExp(term, 'gi').test(text) ||
          new RegExp(term, 'gi').test(Utils.transliterate(text));
      }
    };
  }

  public show() {
    this._load();
    this._modal.show();
  }

  public submit() {
    let transaction = this._selectedUsers.map(user => {
      return { groupId: this._groupId, userId: +user };
    });

    this._groupService.addUsers(transaction).subscribe(() => {
      this._modal.hide();
      this._usersAdded.emit(this._selectedUsers);
      this._notificationService.success('T_USERS_ADDED_TO_GROUP');
    });
  }

  public valueChanged(value: { value: string[] }) {
    this._selectedUsers = [...value.value] || [];
  }

  public addAll() {
    this._selectedUsers = this._availableUsers.map(_ => String(_.id));
    //@TODO THIS IS DAMN BAD PLUGIN
    $(this._users.selector.nativeElement).val(this._selectedUsers);
    $(this._users.selector.nativeElement).trigger('change.select2');
  }

  private _load() {
    let allQueryParams = { status: UserStatus.Approved };
    let groupQueryParams = { status: UserStatus.Approved, groupId: this._groupId };
    this._selectedUsers = [];

    Observable
      .forkJoin(
        this._userService.list(allQueryParams),
        this._userService.list(groupQueryParams)
      )
      .map(([allUsers, groupUsers]: [IListResponse<UserModel>, IListResponse<UserModel>]) => {
        return allUsers.data.filter(user => !groupUsers.data.find(groupUser => groupUser.id === user.id));
      })
      .subscribe((availableUsers: UserModel[]) => {
        this._availableUsers = availableUsers.map(user => {
          return { id: String(user.id), text: `${user.name} (${user.email})` };
        });
      });
  }
}
