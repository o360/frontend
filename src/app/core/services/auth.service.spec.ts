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

import { Injector } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService, tokenLsKey } from './auth.service';
import { ConfigurationServiceStub, RouterStub } from '../../stubs/stubs.utils';
import { Router } from '@angular/router';
import { AccountModel } from '../models/account-model';
import { ConfigurationService } from './configuration.service';

describe('Auth Service', () => {
  let authService: AuthService;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthService,
        { provide: Router, useClass: RouterStub },
        { provide: ConfigurationService, useClass: ConfigurationServiceStub }
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
      firstName: 'John',
      lastName: 'Tester',
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
