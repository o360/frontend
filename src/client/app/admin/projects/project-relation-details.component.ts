import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsComponent } from '../../shared/components/details.component';
import { RelationModel } from '../../core/models/relation-model';
import { RelationService } from '../../core/services/relation.service';
import { EmailKind } from "../../core/models/email-template-model";

@Component({
  moduleId: module.id,
  selector: 'bs-project-relation-details',
  templateUrl: `project-relation-details.component.html`
})
export class ProjectRelationDetailsComponent extends DetailsComponent<RelationModel> {
  public fakeList = [{
    id: 1,
    name: 'some',
    kind: EmailKind.preBegin,
  }, {
    id: 2,
    name: 'some2',
    kind: EmailKind.begin,
  }];

  constructor(service: RelationService,
              route: ActivatedRoute) {
    super(service, route);
  }
}

