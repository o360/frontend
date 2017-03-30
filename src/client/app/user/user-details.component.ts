import { Component, OnInit } from '@angular/core';
import { DetailsComponent } from '../shared/components/details.component'
import { UserModel } from '../shared/models/user-model';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'user-details',
  template: `
    <div *ngIf="element" class="container">
      <h2>{{element.name}} details</h2>
      <!--<p>Id: {{user.id}}</p>-->
      <div>
        <label>name: </label>
        <input [(ngModel)]="element.name" placeholder="name"/>
      </div>
      <button (click)="goBack()">Back</button>
    </div>
  `
})
export class UserDetailsComponent extends DetailsComponent<UserModel> implements OnInit {

  constructor(service: UserService,
              route: ActivatedRoute) {
    super(service, route);
  }
}

