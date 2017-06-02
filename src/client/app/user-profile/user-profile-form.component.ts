import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGender, UserModel } from '../core/models/user-model';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { FormComponent } from '../shared/components/form.component';
import { NotificationService } from '../core/services/notification.service';
import { TimeZone } from '../shared/config/timezone.config';

@Component({
  moduleId: module.id,
  selector: 'bs-user-profile-form',
  templateUrl: 'user-profile-form.component.html'
})
export class UserProfileFormComponent extends FormComponent<UserModel> implements OnInit {
  protected _returnPath = ['/profile'];
  protected _genders: string[] = Object.values(UserGender);
  protected _timezones: string[] = Object.values(TimeZone);

  public get genders(): string[] {
    return this._genders;
  }

  public get timezones(): string[] {
    return this._timezones;
  }

  constructor(service: UserService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              protected _auth: AuthService) {
    super(service, router, route, notificationService);
  }

  public ngOnInit() {
    this._id = this._auth.user.id;
    super.ngOnInit();
  }

  public save() {
    this._service.save(this._model).subscribe(model => {
      if (this._returnPath) {
        this._router.navigate([this._returnPath]);
      }
      this._notificationService.success('T_SUCCESS_SAVED');
    });
  }
}
