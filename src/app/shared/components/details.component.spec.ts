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
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TestService } from '../../core/services/rest.service.spec';
import { TestModel } from '../../core/models/model.spec';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { DetailsComponent } from './details.component';
import {
  ActivatedRouteStub, AuthServiceStub, BreadcrumbServiceStub, ConfirmationStub, NotificationServiceStub, RestServiceStub,
  RouterStub
} from '../../stubs/stubs.utils';
import { ConfirmationService } from '../../core/services/confirmation.service';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { ModelId } from '../../core/models/model';

@Component({
  selector: 'bs-test-list',
  template: ''
})
export class TestDetailsComponent extends DetailsComponent<TestModel> implements OnInit {
  protected _testModel: TestModel = new TestModel();

  constructor(service: TestService,
              activatedRoute: ActivatedRoute,
              router: Router,
              breadcrumbService: BreadcrumbService,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, breadcrumbService, notificationService);
  }

  public ngOnInit() {
    this.update();
  }

  public delete(id: ModelId) {
    super.delete(id);
  }

  public update() {
    super._update();
    this._model = this._testModel;
  }
}

describe('Details Component', () => {
  let comp: TestDetailsComponent;
  let fixture: ComponentFixture<TestDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [TestDetailsComponent],
      providers: [
        { provide: TestService, useClass: RestServiceStub },
        { provide: NotificationService, useClass: NotificationServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        { provide: ConfirmationService, useClass: ConfirmationStub },
        { provide: BreadcrumbService, useClass: BreadcrumbServiceStub },
      ]
    });

    fixture = TestBed.createComponent(TestDetailsComponent);

    comp = fixture.componentInstance;
    comp.ngOnInit();
  });

  it('should define a model', () => {
    expect(comp.model).toBeDefined();
    expect(comp.model instanceof TestModel).toBeTruthy();
  });

  it('should call update', () => {
    const testUpdate = spyOn(comp, 'update');

    comp.ngOnInit();
    expect(testUpdate).toHaveBeenCalled();
  });
});
