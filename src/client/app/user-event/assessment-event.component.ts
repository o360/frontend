import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentModel } from '../core/models/assessment-model';
import { FormModel } from '../core/models/form-model';
import { ModelId } from '../core/models/model';
import { AssessmentService } from '../core/services/assessment.service';
import { NotificationService } from '../core/services/notification.service';
import { IListResponse, IQueryParams } from '../core/services/rest.service';
import { ListComponent } from '../shared/components/list.component';
import { AssessmentObject } from './assessment-object-list.component';

@Component({
  moduleId: module.id,
  selector: 'bs-user-assessment-event',
  templateUrl: 'assessment-event.component.html'
})
export class AssessmentEventComponent extends ListComponent<AssessmentModel> implements OnInit, OnChanges {
  protected _projectId: ModelId;
  protected _eventId: ModelId;
  protected _forms: FormModel[];
  protected _queryParams: IQueryParams = {};
  private _assessmentObject: AssessmentObject = null;

  @Input()
  public set projectId(value: ModelId) {
    this._projectId = value;
  }

  public get projectId() {
    return this._projectId;
  }

  @Input()
  public set eventId(value: ModelId) {
    this._eventId = value;
  }

  public get eventId(): ModelId {
    return this._eventId;
  }

  public get forms(): FormModel[] {
    return this._forms;
  }

  public get assessmentObject(): AssessmentObject {
    return this._assessmentObject;
  }

  constructor(service: AssessmentService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnInit() {
    this._queryParams.eventId = this._eventId.toString();
    this._queryParams.projectId = this._projectId.toString();

    super.ngOnInit();
  }

  public _update() {
    this._service.list(this._queryParams).subscribe((res: IListResponse<AssessmentModel>) => {
      this._meta = res.meta;
      this._list = res.data;
      this._list.map(assessment => {
        assessment.isClassic = !!assessment.user;
        assessment.isAnswered = !assessment.forms.find(x => !x.answers.length);
      });
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId']) {
      Object.assign(this._queryParams, {
        eventId: this._eventId.toString(),
        projectId: this._projectId.toString()
      });
      this._update();
    }
  }

  public displayItem(item: AssessmentObject) {
    this._assessmentObject = null;

    setTimeout(() => this._assessmentObject = item);
  }

  public formChanged() {
    this._update();
  }
}
