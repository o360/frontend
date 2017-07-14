import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';
import { IConflicts, IEntity } from '../../core/services/confirmation.service';
import { GroupService } from '../../core/services/group.service';
import { ModelId } from '../../core/models/model';
import { NotificationService } from '../../core/services/notification.service';

export interface IDataRequestUserFromGroup {
  groupId: ModelId;
  userId: ModelId;
}

@Component({
  moduleId: module.id,
  selector: 'bs-confirmation-modal',
  templateUrl: 'confirmation.component.html'
})
export class ConfirmationModalComponent implements OnInit {
  protected _message: string = 'T_CONFIRM_MESSAGE';
  protected _conflicts: IConflicts;
  protected _modal: ModalDirective;
  protected _conflictKeys: string[];
  protected _confirmed: Subject<boolean> = new Subject<boolean>();
  protected _userId: ModelId = null;

  @Input()
  public set userId(value: ModelId) {
    this._userId = value;
  }

  @Input()
  public set message(value: string) {
    this._message = value;
  }

  @Input()
  public set conflicts(value: IConflicts) {
    this._conflicts = value;
  }

  public get confirmed(): Subject<boolean> {
    return this._confirmed;
  }

  public get message(): string {
    return this._message;
  }

  public get conflicts(): IConflicts {
    return this._conflicts;
  }

  public get userId(): ModelId {
    return this._userId;
  }

  public get conflictKeys(): any {
    return this._conflictKeys;
  }

  public get modal(): ModalDirective {
    return this._modal;
  }

  @ViewChild('modal')
  public set modal(value: ModalDirective) {
    this._modal = value;
  }

  constructor(protected _groupService: GroupService,
              protected _notificationService: NotificationService) {
  }

  public ngOnInit() {
    if (this._conflicts) {
      this._conflictKeys = Object.keys(this._conflicts);
    }
  }

  public submit() {
    this._confirmed.next(true);
    this._modal.hide();
  }

  public hide() {
    this._modal.hide();
  }

  public deleteFromAllGroup() {
    let requestData: IDataRequestUserFromGroup[] = [];
    this._conflicts.groups.forEach((result: IEntity) => {
        let item: IDataRequestUserFromGroup = { 'groupId': result.id, 'userId': this._userId };
        requestData.push(item);
      }
    );
    this._groupService.removeUserFromAllGroup(requestData).subscribe(() =>
      this._notificationService.success('T_SUCCESS_DELETED_USER_FROM_GROUPS'));
  }
}
