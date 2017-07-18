import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../core/models/user-model';
import { AuthService } from '../core/services/auth.service';
import { BreadcrumbService } from '../core/services/breadcrumb.service';
import { UserService } from '../core/services/user.service';
import { DetailsComponent } from '../shared/components/details.component';
import { NotificationService } from '../core/services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'bs-user-profile',
  templateUrl: 'user-profile.component.html',
})
export class UserProfileComponent extends DetailsComponent<UserModel> implements OnInit {
  constructor(service: UserService,
              route: ActivatedRoute,
              router: Router,
              breadcrumbService: BreadcrumbService,
              notificationService: NotificationService,
              protected _auth: AuthService) {
    super(service, route, router, breadcrumbService, notificationService);

    this._returnPath = '';
  }

  public ngOnInit() {
    this._id = this._auth.user.id;
    this._update();
  }
}
