import { Component, OnInit } from '@angular/core';
import { ListComponent } from './list.component';
import { TestModel } from '../../core/models/model.spec';
import { IListResponse } from '../../core/services/rest.service';
import { TestService } from '../../core/services/rest.service.spec';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { ModelId } from '../../core/models/model';

@Component({
  selector: 'bs-test-list',
  template: ``
})
export class TestListComponent extends ListComponent<TestModel> implements OnInit {
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
