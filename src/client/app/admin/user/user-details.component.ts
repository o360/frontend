import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsComponent } from '../../shared/components/details.component';
import { UserService } from '../../core/services/user.service';
import { UserModel } from '../../core/models/user-model';

@Component({
  moduleId: module.id,
  selector: 'bs-user-details',
  templateUrl: `user-details.component.html`
})
export class UserDetailsComponent extends DetailsComponent<UserModel> {
  constructor(service: UserService,
              route: ActivatedRoute) {
    super(service, route);
  }
}

