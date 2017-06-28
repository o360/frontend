import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../core/models/user-model';
import { AuthService } from '../core/services/auth.service';
import { BreadcrumbService } from '../core/services/breadcrumb.service';
import { UserService } from '../core/services/user.service';
import { DetailsComponent } from '../shared/components/details.component';

@Component({
  moduleId: module.id,
  selector: 'bs-user-profile',
  templateUrl: 'user-profile.component.html',
})
export class UserProfileComponent extends DetailsComponent<UserModel> implements OnInit {
  constructor(service: UserService,
              route: ActivatedRoute,
              breadcrumbService: BreadcrumbService,
              protected _auth: AuthService) {
    super(service, route, breadcrumbService);
  }

  public ngOnInit() {
    this._id = this._auth.user.id;
    this._update();
  }
}
