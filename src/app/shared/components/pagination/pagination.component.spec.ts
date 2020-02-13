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

import { PaginationComponent } from './pagination.component';
import { EventEmitter } from '@angular/core';

describe('PaginationComponent', () => {
  let comp: PaginationComponent;

  beforeEach(() => {
    comp = new PaginationComponent();
  });

  it('should define a component', () => {
    expect(comp).toBeDefined();
  });

  it('should have a sizes properties', () => {
    expect(comp.sizes).toBeDefined();
  });

  it('should have a queryParamsChange properties', () => {
    expect(comp.queryParamsChange).toBeDefined();
  });

  it('should have a meta properties', () => {
    comp.meta = {
      number: 6,
      size: 6,
      total: 1
    };
    expect(comp.meta).toBeDefined();
  });

  it('should call sizeChanged', () => {
    comp.sizeChanged(10);
    expect(comp.queryParamsChange).toEqual(jasmine.any(EventEmitter));
  });
});
