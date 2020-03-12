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
  Filter,
  FilterType
} from '../../../core/models/filter';
import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let comp: FiltersComponent;
  let testFilter: Filter = { name: 'test', field: 'test', type: FilterType.STRING, value: 'test string' };

  beforeEach(() => {
    comp = new FiltersComponent();
  });

  it('should define a component', () => {
    expect(comp).toBeDefined();
  });

  it('should have a filters property', () => {
    expect(comp.filters).toBeDefined();
  });

  it('should have a filterChange property', () => {
    expect(comp.filterChange).toBeDefined();
  });

  it('should have a FilterType property', () => {
    expect(comp.FilterType).toBeDefined();
  });

  it('should have a isFilterNotEmpty property', () => {
    expect(comp.isFilterNotEmpty).toBeDefined();
  });

  it('should have a isCollapsed property', () => {
    comp.isCollapsed = true;

    expect(comp.isCollapsed).toBeDefined();
    expect(comp.isCollapsed).toEqual(true);
  });

  it('should call apply() when reset() called', () => {
    let testApply = spyOn(comp, 'apply');

    comp.reset();
    expect(testApply).toHaveBeenCalled();
  });

  it('should clear values of filters when reset() called', () => {
    comp.filters = [testFilter, testFilter];

    comp.reset();
    expect(comp.filters[0].value).toBeNull();
    expect(comp.filters[1].value).toBeNull();
  });

  it('should call apply() when resetFilter() called', () => {
    let testApply = spyOn(comp, 'apply');
    let filter: Filter = { name: 'test', field: 'test', type: FilterType.STRING };

    comp.resetFilter(filter);
    expect(testApply).toHaveBeenCalled();
  });

  it('should clear filter value when resetFilter() called', () => {
    comp.resetFilter(testFilter);
    expect(testFilter.value).toBeNull();
  });

  it('should save previously applied filters', () => {
    comp.filters = [testFilter, testFilter];
    comp.filters[0].value = 'new string';
    comp.checkFiltersChange();
    expect(comp.areFiltersChangedSinceLastApply).toBeTruthy();
    comp.apply();
    expect(comp.areFiltersChangedSinceLastApply).toBeFalsy();
  });

  it('should watch are filters changed since last apply', () => {
    comp.filters = [testFilter, testFilter];
    comp.apply();
    expect(comp.areFiltersChangedSinceLastApply).toBeFalsy();

    comp.filters[0].value = 'new value';
    comp.checkFiltersChange();
    expect(comp.areFiltersChangedSinceLastApply).toBeTruthy();
  });
});
