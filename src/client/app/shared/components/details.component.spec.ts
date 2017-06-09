import { Component, OnInit } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TestModel } from '../../core/models/model.spec';
import { IListResponse, IQueryParams, RestService } from '../../core/services/rest.service';
import { DetailsComponent } from './details.component';
import { TestService } from '../../core/services/rest.service.spec';
import { Subject } from 'rxjs/Subject';

export class ActivatedRouteStub {
  // public params: Subject<Params> = new Subject<Params>();
  protected _testParams: IQueryParams;
  public params: Observable<Params>;
  public parent = {
    params: Observable.of({})
  };

  get testParams() {
    return this._testParams;
  }

  set testParams(params: IQueryParams) {
    this._testParams = params;
  }
}

export class RestServiceStub {
  public get() {
    return new Observable<TestModel>();
  }
}

export class RouterStub {
}

@Component({
  moduleId: module.id,
  selector: 'bs-test-details',
  template: ''
})
export class TestDetailsComponent extends DetailsComponent<TestModel> implements OnInit {
  protected _testResponse: IListResponse<TestModel> = {
    data: [new TestModel({ 'id': 1, 'name': 'test' }), new TestModel({ 'id': 2, 'name': 'test1' })],
    meta: {
      total: 2,
      size: 2,
      number: 1
    }
  };

  constructor(service: RestService<TestModel>, route: ActivatedRoute) {
    super(service, route);
  }
}

export function main() {
  describe('DetailsComponent', () => {
    let testService: RestServiceStub;
    let activatedRoute: ActivatedRouteStub;
    let comp: TestDetailsComponent;
    let fixture: ComponentFixture<TestDetailsComponent>;
    let testModel: TestModel;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestDetailsComponent],
        providers: [ TestService,
          { provide: RestService, useClass: RestServiceStub },
          { provide: ActivatedRoute, useClass: ActivatedRouteStub, useValue: { 'params': Observable.from([{ 'id': 1 }]) } }
        ]
      });

      fixture = TestBed.createComponent(TestDetailsComponent);

      comp = fixture.componentInstance;
      comp.ngOnInit();

      // testService = <any>fixture.debugElement.injector.get(RestService);
      // activatedRoute = <any>fixture.debugElement.injector.get(ActivatedRoute);
    });

    afterEach(() => {
      testService = undefined;
      activatedRoute = undefined;
    });

    it('should create a component and define a model', () => {
      expect(comp).toBeDefined();
      expect(comp.model).toBeDefined();
    });

    it('should create a component and define a model', () => {
      expect(comp).toBeDefined();
      expect(comp.model).toBeDefined();
    });

    // it('should create a `FormGroup` comprised of `FormControl`s', () => {
    //   fixture.detectChanges();
    //   params
    //   // spyOn(testService, 'get').and.returnValue(Observable.of(testModel));
    //   // expect(testService.get()).toHaveBeenCalled();
    //   // comp.ngOnInit();
    //   // expect(comp.model instanceof TestModel).toBe(true);
    // });


    // it('', () => {
    //   // let mockParams = new ActivatedRouteStub({'id': '1'});
    //   inject([RestServiceStub], (testService: RestServiceStub) => {
    //     testService.get().subscribe(res => {
    //       expect(res.name).toBe('test');
    //     });
    //   });
    //   // expect(comp.model);
    //   // expect(testService.get()).toHaveBeenCalled();
    // });

    // it('should resolve test data', () => {
    //   const spy = spyOn(testService, 'get').and.returnValue(
    //     Observable.of(TestModel)
    //   );
    //   comp.ngOnInit();
    //   fixture.detectChanges();
    //   expect(comp.ngOnInit().spyOn)
    //   // expect(comp.model).toEqual(TestModel);
    //   // expect(spy.calls.any()).toEqual(true);
    // });

    // it('should resolve test data', () => {
    //   const spy = spyOn(testService, 'get').and.returnValue(
    //     Observable.of(TestModel)
    //   );
    //   comp.ngOnInit();
    //   fixture.detectChanges();
    //   expect(comp.model).toEqual(TestModel);
    //   expect(spy.calls.any()).toEqual(true);
    // });
    //
    // it('should display 1st hero\'s name', () => {
    //   // const expectedHero = testModel;
    //   activatedRoute.params = n;
    //     // { id: testModel.id };
    //   createComponent().then(() => {
    //     expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    //   });
    // });
  });
}

