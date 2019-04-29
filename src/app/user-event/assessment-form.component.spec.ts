import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TestService } from '../core/services/rest.service.spec';
import { NotificationService } from '../core/services/notification.service';
import {
  ActivatedRouteStub,
  AssessmentServiceStub,
  FormServiceStub,
  NotificationServiceStub,
  RestServiceStub,
  RouterStub
} from '../stubs/stubs.utils';
import { AssessmentFormComponent } from './assessment-form.component';
import { AssessmentService } from '../core/services/assessment.service';
import { FormService } from '../core/services/form.service';

@Component({
  selector: 'bs-assessment-form-tests',
  template: ''
})
export class TestAssessmentFormComponent extends AssessmentFormComponent implements OnInit {

  constructor(assessmentService: AssessmentService,
              formUsersService: FormService,
              notificationService: NotificationService,
              router: Router) {
    super(assessmentService, formUsersService, notificationService, router);
  }
}

describe('Assessment Form Component', () => {
  let comp: TestAssessmentFormComponent;
  let fixture: ComponentFixture<TestAssessmentFormComponent>;
  let store = {};
  let assessmentService: AssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [TestAssessmentFormComponent],
      providers: [
         { provide: AssessmentService, useClass: AssessmentServiceStub },
         { provide: FormService, useClass: FormServiceStub },
         { provide: TestService, useClass: RestServiceStub },
         { provide: NotificationService, useClass: NotificationServiceStub },
         { provide: ActivatedRoute, useClass: ActivatedRouteStub },
         { provide: Router, useClass: RouterStub },
      ]
    });

    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    fixture = TestBed.createComponent(TestAssessmentFormComponent);
    comp = fixture.componentInstance;
    assessmentService = TestBed.get(AssessmentService);

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should store the value in localStorage', () => {
    localStorage.setItem('someKey', 'test');
    expect(localStorage.getItem('someKey')).toEqual('test');
  });

  it('should be defined', () => {
    expect(comp).toBeDefined();
  });
});
