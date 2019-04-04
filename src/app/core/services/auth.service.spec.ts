import { Injector } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { AuthService, tokenLsKey } from './auth.service';
import { RouterStub } from '../../stubs/stubs.utils';
import { Router } from '@angular/router';
import { AccountModel } from '../models/account-model';

export function main() {
  describe('Auth Service', () => {
    let authService: AuthService;
    let injector: Injector;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [AuthService,
          {provide: Router, useClass: RouterStub},
        ]
      });
      injector = getTestBed();
      authService = injector.get(AuthService);
    });

    afterEach(() => {
      authService = undefined;
    });

    it('should be defined', () => {
      expect(AuthService).toBeDefined();
      expect(authService).toBeDefined();
      expect(authService instanceof AuthService).toBeTruthy();
    });

    it('should save token to the local storage and update it inside the service', () => {
      let token = 'testToken';
      authService.saveToken(token);
      expect(authService.token).toEqual(token);
      expect(localStorage.getItem(tokenLsKey)).toEqual(token);
    });

    it('should have isLoggedIn status', () => {
      let token = 'testToken';
      authService.saveToken(token);
      expect(authService.isLoggedIn).toBeTruthy();
      authService.token = undefined;
      expect(authService.isLoggedIn).toBeFalsy();
    });

    it('should have logged in user information and check has the user admin rights', () => {
      authService.user = new AccountModel({
        id: 1,
        name: 'Mr. Test Testov',
        email: 'testov_tt@bw-sw.com',
        gender: 'male',
        timezone: 'Z',
        role: 'user',
        status: 'approved'
      });
      expect(authService.isAdmin).toBeFalsy();
      authService.user.role = 'admin';
      expect(authService.isAdmin).toBeTruthy();
    });

    it('should log out user and remove token', () => {
      let token = 'testToken';
      authService.saveToken(token);
      authService.logout();
      expect(localStorage.getItem(tokenLsKey)).toBeNull();
    });
  });
}
