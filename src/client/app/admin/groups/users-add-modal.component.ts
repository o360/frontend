import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { ModelId } from '../../core/models/model';
import { UserModel, UserStatus } from '../../core/models/user-model';
import { GroupService } from '../../core/services/group.service';
import { NotificationService } from '../../core/services/notification.service';
import { IListResponse } from '../../core/services/rest.service';
import { UserService } from '../../core/services/user.service';
import { Utils } from '../../utils';
import { TranslateService } from '@ngx-translate/core';
// import { Select2Component } from 'ng2-select2/ng2-select2';

interface ISelectUser {
  id: ModelId;
  text: string;
}
@Component({
  moduleId: module.id,
  selector: 'bs-users-add-modal',
  templateUrl: 'users-add-modal.component.html'
})
export class UsersAddModalComponent implements OnChanges, OnInit {
  private _groupId: string = 'null';
  private _selectedUsers: ModelId[] = [];
  private _modal: ModalDirective;
  private _usersAdded: EventEmitter<ModelId[]> = new EventEmitter<ModelId[]>();
  private _selectItems: ISelectUser[] = [];
  private _options: Select2Options;
  public inside: ISelectUser[] = [];
  // protected _selectComponent: Select2Component;
  //
  // @ViewChild('users')
  // public set selectComponent(value: Select2Component) {
  //   this._selectComponent = value;
  // }

  @Input()
  public set groupId(value: string) {
    this._groupId = value;
  }

  public get selectItems(): ISelectUser[] {
    return this._selectItems;
  }

  public get options() {
    return this._options;
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
              protected _notificationService: NotificationService,
              protected _translate: TranslateService) {
  }

  public ngOnInit() {
    console.log(this._selectItems);
    this._options = {
      allowClear: true,
      placeholder: '',
      multiple: true,
      openOnEnter: true,
      closeOnSelect: true,
      dropdownAutoWidth: true,
      initSelection: (element: any, callback: any) => {
        callback(this.inside);
      },
      escapeMarkup: (term: any) => {
        return (term === 'No results found') ? this._translate.instant('T_EMPTY') : term;
      },
      matcher: (term: string, text: string) => {
        return new RegExp(term, 'gi').test(text) ||
          new RegExp(term, 'gi').test(Utils.transliterate(text));
      }
    };
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

  public selectUser(value: { value: string[] }) {
    if (value.value) {
      this._selectedUsers = [];
      value.value.forEach((id => {
        this._selectedUsers.push(id);
      }));
      console.log(this._selectComponent);
    }
  }

  public addAll() {
    this.inside = this._selectItems;
    this._selectItems.map((item => {
      this._selectedUsers.push(item.id);
    }));
    this._selectItems = [];
    console.log(this._selectedUsers);
    console.log(this._selectItems);
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
        let availableForSelectionUsers: ISelectUser[] = [];
        availableUsers.map((user: UserModel) => {
          availableForSelectionUsers.push({ id: user.id, text: `${user.name} (${user.email})` });
        });
        this._selectItems = availableForSelectionUsers;
      });
    this._selectedUsers = [];
    this._selectItems = [];
  }
}
