import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsComponent } from '../../shared/components/details.component';
import { RelationModel } from '../../core/models/relation-model';
import { RelationService } from '../../core/services/relation.service';

@Component({
  moduleId: module.id,
  selector: 'project-relation-details',
  templateUrl: `project-relation-details.component.html`
})
export class ProjectRelationDetailsComponent extends DetailsComponent<RelationModel>{
  constructor(service: RelationService,
              route: ActivatedRoute) {
    super(service, route);
  }
}

