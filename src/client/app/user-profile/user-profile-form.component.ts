import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGender, UserModel } from '../core/models/user-model';
import { AuthService } from '../core/services/auth.service';
import { FormComponent } from '../shared/components/form.component';
import { NotificationService } from '../core/services/notification.service';
import * as moment from 'moment-timezone';
import { BreadcrumbService } from '../core/services/breadcrumb.service';
import { AccountService } from '../core/services/account.service';
import { UserPictureService } from '../core/services/user-picture.service';

@Component({
  moduleId: module.id,
  selector: 'bs-user-profile-form',
  templateUrl: 'user-profile-form.component.html'
})
export class UserProfileFormComponent extends FormComponent<UserModel> implements OnInit {
  protected _returnPath = ['/profile'];
  protected _genders: string[] = Object.values(UserGender);
  protected _timezones: string[] = moment.tz.names();
  protected _profileImage: any;
  protected _avatar: any;
  protected _choosePictureInput: any;

  public get genders(): string[] {
    return this._genders;
  }

  public get timezones(): string[] {
    return this._timezones;
  }

  public get avatar(): any {
    return this._avatar;
  }

  public get profileImage(): any {
    return this._profileImage;
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
    this._id = this._auth.user.id;
    this._getUserPicture();
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

  public getOffset(tzId: string) {
    return moment.tz(tzId).format('Z');
  }

  public onPictureUpload(event: EventTarget) {
    let eventObj = <MSInputMethodContext>event;
    let target = <HTMLInputElement>eventObj.target;
    this._profileImage = target.files[0];
  }

  public savePicture(image: any) {
    (<AccountService>this._service).setPicture(image).subscribe(picture => {
      this._getUserPicture();
    }, error => this._notificationService.error(error));
  }

  protected _getUserPicture() {
    this._userPictureService.getPicture(this._id).subscribe(picture => this._avatar = picture);
  }
}
