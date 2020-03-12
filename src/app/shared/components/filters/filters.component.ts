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

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { Filter, FilterType } from '../../../core/models/filter';
import * as _ from 'lodash';

@Component({
  selector: 'bs-filters',
  templateUrl: 'filters.component.html'
})
export class FiltersComponent implements OnChanges {
  private _appliedFilters: Filter[] = [];
  private _filters: Filter[] = [];
  private _filterChange: EventEmitter<any> = new EventEmitter<any>();
  private _isCollapsed: boolean;
  private _areFiltersChangedSinceLastApply: boolean = false;

  public get isCollapsed(): boolean {
    return this._isCollapsed;
  }

  public set isCollapsed(value: boolean) {
    this._isCollapsed = value;
  }

  public get filters(): Filter[] {
    return this._filters;
  }

  @Input()
  public set filters(value: Filter[]) {
    this._filters = value;
  }

  @Output()
  public get filterChange(): EventEmitter<any> {
    return this._filterChange;
  }

  public get FilterType() {
    return FilterType;
  }

  public get areFiltersChangedSinceLastApply(): boolean {
    return this._areFiltersChangedSinceLastApply;
  }

  public get isFilterNotEmpty() {
    return !!this._filters.find(f => f.value);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ('filters' in changes) {
      this._syncAppliedFilters();
    }
  }

  public apply() {
    this._syncAppliedFilters();

    let params: object = this._filters
      .filter(x => x.value !== undefined && x.value !== null)
      .reduce<object>((acc: object, filter: Filter) => Object.assign(acc, { [filter.field]: filter.value.toString() }), {});

    this._filterChange.emit(params);
  }

  public checkFiltersChange() {
    this._areFiltersChangedSinceLastApply = !_.isEqual(this._appliedFilters, this._filters);
  }

  public reset() {
    this._filters.forEach(x => x.value = null);
    this.apply();
  }

  public resetFilter(filter: Filter) {
    filter.value = null;
    this.apply();
  }

  private _syncAppliedFilters() {
    this._appliedFilters = _.cloneDeep(this._filters);
    this.checkFiltersChange();
  }
}
