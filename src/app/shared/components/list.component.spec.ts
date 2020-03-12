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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TestService } from '../../core/services/rest.service.spec';
import { TestModel } from '../../core/models/model.spec';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { IListResponse, IQueryParams } from '../../core/services/rest.service';
import { FilterType } from '../../core/models/filter';
import {
  ActivatedRouteStub,
  AuthServiceStub,
  ConfirmationStub,
  NotificationServiceStub,
  RestServiceStub,
  RouterStub
} from '../../stubs/stubs.utils';
import { ConfirmationService } from '../../core/services/confirmation.service';
import { Component, OnInit } from '@angular/core';
import { ListComponentDirective } from './list-component.directive';
import { ModelId } from '../../core/models/model';

@Component({
  selector: 'bs-test-list',
  template: ``
})
export class TestListComponent extends ListComponentDirective<TestModel> implements OnInit {
  protected _testResponse: IListResponse<TestModel> = {
    data: [new TestModel({ 'id': 1, 'name': 'test' }), new TestModel({ 'id': 2, 'name': 'test2' })],
    meta: {
      total: 2,
      size: 2,
      number: 1
    }
  };

  constructor(service: TestService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnInit() {
    this._update();
  }

  public processRequestParams() {
    return this._processRequestParams(this._activatedRoute.params);
  }

  public delete(id: ModelId) {
    super.delete(id);

    let toDelete = this._list.filter(x => x.id === id)[0];
    let index = this._list.indexOf(toDelete);
    if (index !== -1) {
      this._list.splice(index, 1);
    }
  }

  protected _update() {
    super._update();

    this._list = this._testResponse.data;
    this._meta = this._testResponse.meta;
  }
}

describe('List Component', () => {
  let comp: TestListComponent;
  let fixture: ComponentFixture<TestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [TestListComponent], // declare the test component
      providers: [
        { provide: TestService, useClass: RestServiceStub },
        { provide: NotificationService, useClass: NotificationServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        { provide: ConfirmationService, useClass: ConfirmationStub }
      ]
    });

    fixture = TestBed.createComponent(TestListComponent);

    comp = fixture.componentInstance;
    comp.ngOnInit();
  });

  it('should define the list', () => {
    expect(comp.list).toBeDefined();
    expect(comp.isLoaded).toBeTruthy();
  });

  it('should have query parameters', () => {
    expect(comp.queryParams).toBeDefined();
    let oldQueryParams = comp.queryParams;
    let newQueryParams: IQueryParams = {
      number: '1',
      size: '1'
    };
    comp.filterChange(newQueryParams);

    expect(oldQueryParams === newQueryParams).toBeFalsy();
  });

  it('should have meta data of the list', () => {
    expect(comp.meta).toBeDefined();
  });

  it('should have filter settings', () => {
    expect(comp.filters).toBeDefined();
  });

  it('can setup filters', () => {
    comp.filters = [{
      name: 'T_NAME',
      field: 'name',
      type: FilterType.STRING,
      values: Object.values(TestModel.name).map(x => ({ value: x }))
    }];
    expect(comp.filters.length).toEqual(1);
  });

  it('should manage list filters by pagination', () => {
    comp.embedded = true;
    let oldQueryParams = comp.queryParams;
    comp.processRequestParams();
    expect(oldQueryParams).toEqual(comp.queryParams);
  });

  it('should not manage list filters by URL if it is embedded', () => {
    comp.embedded = true;
    let oldQueryParams = comp.queryParams;
    let newQueryParams: IQueryParams = {
      size: '1'
    };
    comp.pageQueryParamsChanged(newQueryParams);
    expect(oldQueryParams).toEqual(comp.queryParams);
  });

  it('can have a readonly option', () => {
    comp.readonly = true;
    expect(comp.readonly).toBeTruthy();
  });

  it('can delete an element from the list', () => {
    comp.delete(1);
    expect(comp.list.length).toEqual(1);
  });
});
