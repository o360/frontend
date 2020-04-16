/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountModel } from '../core/models/account-model';
import { UserGender, UserModel, UserStatus } from '../core/models/user-model';
import { AuthService } from '../core/services/auth.service';
import { FormComponent } from '../shared/components/form.component';
import { NotificationService } from '../core/services/notification.service';
import * as moment from 'moment-timezone';
import { BreadcrumbService } from '../core/services/breadcrumb.service';
import { AccountService } from '../core/services/account.service';
import { UserPictureService } from '../core/services/user-picture.service';

@Component({
  selector: 'bs-user-profile-form',
  templateUrl: 'user-profile-form.component.html'
})
export class UserProfileFormComponent extends FormComponent<UserModel> implements OnInit {
  protected _returnPath = ['/profile'];
  protected _genders: string[] = Object.values(UserGender);
  protected _timezones: string[] = moment.tz.names();
  protected _choosePictureInput: any;

  public get genders(): string[] {
    return this._genders;
  }

  public get timezones(): string[] {
    return this._timezones;
  }

  @ViewChild('choosePictureInput')
  public set choosePictureInput(value: any) {
    this._choosePictureInput = value;
  }

  constructor(service: AccountService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              breadcrumbService: BreadcrumbService,
              protected _auth: AuthService,
              protected _userPictureService: UserPictureService) {
    super(service, router, route, notificationService, breadcrumbService);
  }

  public ngOnInit() {
    this._service.get(this._id).subscribe((model: AccountModel) => {
      if (model.status === UserStatus.New) {
        this._router.navigate(this._returnPath);
      } else {
        this._id = this._auth.user.id;

        if (this._auth.user.hasPicture) {
          this._getUserPicture();
        }

        super.ngOnInit();
      }
    });
  }

  public save() {
    this._service.save(this._model).subscribe((model: AccountModel) => {
      this._auth.user = model;

      if (this._returnPath) {
        this._router.navigate([this._returnPath]);
      }
      this._notificationService.success('T_SUCCESS_SAVED');
    });
  }

  public getOffset(tzId: string) {
    return moment.tz(tzId).format('Z');
  }

  public savePicture(image: any) {
    (<AccountService> this._service).setPicture(image).subscribe(
      () => this._getUserPicture(),
      error => this._notificationService.error(error)
    );
  }

  protected _getUserPicture() {
    this._userPictureService.getPicture(this._id).subscribe(picture => this._model.picture = picture);
  }
}
