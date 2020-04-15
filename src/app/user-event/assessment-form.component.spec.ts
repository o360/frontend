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
import { of } from 'rxjs';
import { AssessmentModel } from '../core/models/assessment-model';
import { UserModel } from '../core/models/user-model';
import {
  FormElementType,
  FormModel
} from '../core/models/form-model';

const testForm = new FormModel({
  id: 1025,
  elements: [
    {
      id: 5895,
      kind: FormElementType.Textfield,
    },
    {
      id: 5823,
      kind: FormElementType.Textfield,
    }
  ],
});

const testAssessment = new AssessmentModel({
  forms: [
    {
      answers: [
        { elementId: 5895, text: 'sd' }, { elementId: 5823, text: '2323' }
      ],
      isSkipped: false,
      form: { id: 1025, name: 'Игра престолов: Кто завладеет Железным троном?' },
      isAnonymous: false,
      status: 'answered'
    }
  ],
  form: {
    answers: [
      { elementId: 5895, text: 'sd' }, { elementId: 5823, text: '2323' }
    ],
    isSkipped: false,
    form: { id: 1025, name: 'Игра престолов: Кто завладеет Железным троном?' },
    isAnonymous: false,
    status: 'answered'
  },
  isAnswered: true,
  isClassic: false,
  user: {
    id: 89,
    firstName: 'John',
    lastName: 'Tester',
    gender: 'male',
    hasPicture: false,
    email: 'test@test.rr',
    status: '',
    role: '',
    timezone: 'Z',
    termsApproved: false,
  }
});

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
  let formService: FormServiceStub;

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

    fixture = TestBed.createComponent(TestAssessmentFormComponent);
    comp = fixture.componentInstance;
    assessmentService = TestBed.inject(AssessmentService);
    formService = TestBed.inject(FormService);
  });

  it('should be defined', () => {
    expect(comp).toBeDefined();
  });

  it('should get is form anonymous from server response', () => {
    spyOn(assessmentService, 'list').and.returnValue(of({ data: [testAssessment], meta: null }));
    spyOn(formService, 'get').and.returnValue(of(testForm));
    comp.isAnonymous = true;
    comp.user = new UserModel({ id: 89 });
    expect(comp.isAnonymous).toBeTruthy();
    fixture.detectChanges();
    expect(comp.isAnonymous).toBeFalsy();
  });

  it('should get is form anonymous from localStorage', () => {
    spyOn(localStorage.__proto__, 'getItem').and.returnValue(JSON.stringify(testAssessment));
    spyOn(formService, 'get').and.returnValue(of(testForm));
    comp.isAnonymous = true;
    expect(comp.isAnonymous).toBeTruthy();
    fixture.detectChanges();
    expect(comp.isAnonymous).toBeFalsy();
  });
});
