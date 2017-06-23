import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestService } from '../../core/services/rest.service.spec';
import { TestModel } from '../../core/models/model.spec';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRouteStub, AuthServiceStub, ConfirmationStub, NotificationServiceStub, RouterStub } from '../../stubs/stubs.utils';
import { ConfirmationService } from '../../core/services/confirmation.service';
import { FormComponent } from './form.component';

@Component({
  moduleId: module.id,
  selector: 'bs-test-list',
  template: ''
})
export class TestFormComponent extends FormComponent<TestModel> implements OnInit {
  protected _testModel: TestModel = new TestModel();

  constructor(service: TestService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService) {
    super(service, router, route, notificationService);
  }
}

export function main() {
  describe('Form Component', () => {
    let comp: TestFormComponent;
    let fixture: ComponentFixture<TestFormComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpModule],
        declarations: [TestFormComponent],
        providers: [
          TestService,
          {provide: NotificationService, useClass: NotificationServiceStub},
          {provide: AuthService, useClass: AuthServiceStub},
          {provide: XHRBackend, useClass: MockBackend},
          {provide: ActivatedRoute, useClass: ActivatedRouteStub},
          {provide: Router, useClass: RouterStub},
          {provide: ConfirmationService, useClass: ConfirmationStub}
        ]
      });

      fixture = TestBed.createComponent(TestFormComponent);

      comp = fixture.componentInstance;
      comp.ngOnInit();
    });

    it('should define a model', () => {
      expect(comp.model).toBeDefined();
      expect(comp.model instanceof TestModel).toBeTruthy();
      expect(comp.isLoaded).toBeTruthy();
    });

    it('should call load', () => {
      const testLoad = spyOn(comp, '_load');

      comp.ngOnInit();
      expect(testLoad).toHaveBeenCalled();
    });

    it('should be edit or create mode form and save updated model', () => {
      expect(comp.editMode).toBeFalsy();
      let newTestModel = new TestModel({id: 99, name: 'new Test Model'});
      comp.model = newTestModel;
      comp.save();
    });
  });
}
