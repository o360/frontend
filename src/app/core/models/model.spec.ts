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

import { Model, ModelId } from './model';
import { Defaults } from '../decorators/defaults.decorator';

@Defaults({
  id: 1,
  name: 'test'
})
export class TestModel extends Model {
  public id: ModelId;
  public name: string;
}

describe('Model class', () => {
  let model: TestModel;

  beforeEach(() => {
    model = new TestModel();
  });

  it('should be defined', () => {
    expect(TestModel).toBeDefined();
    expect(model).toBeDefined();
    expect(model instanceof TestModel).toBeTruthy();
  });

  it('should convert an object to json', () => {
    expect(JSON.stringify(model.toJson())).toEqual('{"id":1,"name":"test"}');
  });

  it('should have a name by default', () => {
    expect(model.name).toEqual('test');
  });
});
