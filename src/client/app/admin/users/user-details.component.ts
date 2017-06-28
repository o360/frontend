import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../../core/models/user-model';
import { UserService } from '../../core/services/user.service';
import { DetailsComponent } from '../../shared/components/details.component';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

@Component({
  moduleId: module.id,
  selector: 'bs-user-details',
  templateUrl: `user-details.component.html`
})
export class UserDetailsComponent extends DetailsComponent<UserModel> {
  constructor(service: UserService,
              route: ActivatedRoute,
              breadcrumbService: BreadcrumbService) {
    super(service, route, breadcrumbService);
  }
}
