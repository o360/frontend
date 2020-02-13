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

import { ConfirmationModalComponent } from './confirmation.component';

describe('ConfirmationModalComponent', () => {
  let comp: ConfirmationModalComponent;

  beforeEach(() => {
    comp = new ConfirmationModalComponent();
  });

  it('should define a component', () => {
    expect(comp).toBeDefined();
  });

  it('should have conflictsKeys', () => {
    comp.conflicts = { projects: [{ id: '1', name: 'first' }] };
    comp.ngOnInit();

    expect(comp.conflicts).toBeDefined();
    expect(comp.conflictKeys).toBeDefined();
    expect(comp.conflictKeys).toEqual(['projects']);
  });

  it('should have a confirmed property', () => {
    expect(comp.confirmed).toBeDefined();
  });

  it('should have a message property', () => {
    expect(comp.message).toBeDefined();
    comp.message = 'testMessage';
    expect(comp.message).toEqual('testMessage');
  });
});
