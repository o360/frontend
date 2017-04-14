import { Component, OnInit } from '@angular/core';
import { Model, ModelId } from '../core/models/model';
import { UserService } from '../core/services/user.service';
import { AuthService } from '../core/services/auth.service';
import { DetailsComponent } from '../shared/components/details.component';
import { UserModel } from '../core/models/user-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-user-profile',
  templateUrl: 'user-profile.component.html',
})
export class UserProfileComponent extends DetailsComponent<UserModel> implements OnInit {
  constructor(service: UserService,
              route: ActivatedRoute,
              protected _auth: AuthService) {
    super(service, route);
  }

  public ngOnInit() {
    this._id = this._auth.user.id;
    this._update();
  }
}
