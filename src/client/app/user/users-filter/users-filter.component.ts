import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Config } from '../../shared/config/env.config';
import { Filter } from '../../core/models/filter';

@Component({
  moduleId: module.id,
  selector: 'bs-users-filter',
  templateUrl: 'users-filter.component.html'
})
export class UsersFilterComponent {
  private _filters: Filter[] = [];
  private _status: string;
  private _role: string;
  private _sort: string;

  public get filters(): Filter[] {
    return this._filters;
  }

  public set status(value: string) {
    this._status = value;
  }

  public set role(value: string) {
    this._role = value;
  }

  public set sort(value: string) {
    this._sort = value;
  }

  constructor(protected _userService: UserService) {
    Config.USERS_FILTERS.map((value: Filter) => {
      this._filters.push(value);
    });
  }

  public apply() {
    console.log('Apply filters!');
  }
}
