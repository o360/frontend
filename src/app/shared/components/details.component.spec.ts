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
