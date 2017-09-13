import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../core/services/notification.service';
import { AccountService } from '../core/services/account.service';
import { AccountModel } from '../core/models/account-model';

@Component({
  moduleId: module.id,
  selector: 'bs-terms',
  templateUrl: 'agreement.component.html',
  styleUrls: ['agreement.component.css']
})
export class AgreementComponent {
  protected _approved: boolean = false;

  public get approved(): boolean {
    return this._approved;
  }

  public set approved(value: boolean) {
    this._approved = value;
  }

  public get user(): AccountModel {
    return this._auth.user;
  }

  constructor(protected _auth: AuthService,
              protected _accountService: AccountService,
              protected _router: Router,
              protected _notificationService: NotificationService) {
  }

  public approve() {
    this._auth.user.termsApproved = this._approved;
    this._accountService.save(this._auth.user).subscribe(() => {
      this._router.navigate(['']);
    }, error => this._notificationService.error('T_ERROR_AGREEMENT'));
  }
}
