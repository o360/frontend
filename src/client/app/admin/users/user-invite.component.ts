import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../../shared/components/list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { InviteModel } from '../../core/models/invite-model';
import { InviteService } from '../../core/services/invite.service';
import { GroupModel } from '../../core/models/group-model';

@Component({
  moduleId: module.id,
  selector: 'bs-user-invite',
  templateUrl: 'user-invite.component.html'
})
export class UserInviteComponent extends ListComponent<InviteModel> implements OnInit {
  private _groups: GroupModel[];

  public get groups(): GroupModel[] {
    return this._groups;
  }

  constructor(service: InviteService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  protected _update() {
    delete this._queryParams.sort;
    super._update();
  }
}
