import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TestService } from '../../core/services/rest.service.spec';
import { TestModel } from '../../core/models/model.spec';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { IQueryParams } from '../../core/services/rest.service';
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
import { TestListComponent } from './test-list.component';

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
      type: FilterType.String,
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
