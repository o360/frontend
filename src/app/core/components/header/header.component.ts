import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AccountModel } from '../../models/account-model';
import { Config } from '../../../../environments/env.config';

@Component({
  selector: 'bs-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements AfterViewInit {
  private _user: AccountModel;
  private _titleNav: string;

  public get user(): AccountModel {
    return this._user;
  }

  public get titleNav(): string {
    return this._titleNav;
  }

  constructor(private _authService: AuthService) {
    this._user = this._authService.user;
    this._titleNav = Config.TITLE_NAV || 'BW Assessment';
  }

  public logout() {
    this._authService.logout();
  }

// @todo: Rewrite scripts from theme
  public ngAfterViewInit() {
    // tslint:disable-next-line:no-this-assignment
    let _self = this;
    $('.navbar-toggler').on('click', function (e) {
      e.preventDefault();

      if ($(this).hasClass('sidebar-toggler')) {
        $('body').toggleClass('sidebar-hidden');
        _self.resizeBroadcast();
      }

      if ($(this).hasClass('aside-menu-toggler')) {
        $('body').toggleClass('aside-menu-hidden');
        _self.resizeBroadcast();
      }

      if ($(this).hasClass('mobile-sidebar-toggler')) {
        $('body').toggleClass('sidebar-mobile-show');
        _self.resizeBroadcast();
      }
    });

    $('.sidebar-close').on('click', () => {
      $('body').toggleClass('sidebar-opened').parent().toggleClass('sidebar-opened');
    });
  }

  private resizeBroadcast() {
    let timesRun = 0;
    let interval = setInterval(() => {
      timesRun += 1;
      if (timesRun === 5) {
        clearInterval(interval);
      }
      window.dispatchEvent(new Event('resize'));
    }, 62.5);
  }
}
