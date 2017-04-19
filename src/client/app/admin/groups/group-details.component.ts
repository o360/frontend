import { Component } from '@angular/core';
import { GroupModel } from '../../core/models/group-model';
import { DetailsComponent } from '../../shared/components/details.component';
import { GroupService } from '../../core/services/group.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-group-details',
  templateUrl: 'group-details.component.html'
})
export class GroupDetailsComponent extends DetailsComponent<GroupModel> {
  constructor(service: GroupService, route: ActivatedRoute) {
    super(service, route);
  }
}
